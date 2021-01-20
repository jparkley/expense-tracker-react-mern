import React, { useContext, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import Axios from "axios"
import DispatchContext from "../context/DispatchContext"

function AddTransaction() {
  const appDispatch = useContext(DispatchContext)
  const initialState = {
    text: {
      value: "",
      hasErrors: false,
      message: ""
    },
    amount: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  }

  function thisReducer(draft, action) {
    switch (action.type) {
      case "TEXT_VALIDATION":
        draft.text.hasErrors = false
        draft.text.value = action.value
        if (!draft.text.value) {
          draft.text.hasErrors = true
          draft.text.message = "Please enter transaction text."
        }
        if (draft.text.value && !/^([a-zA-Z0-9_# ]+)$/.test(draft.text.value)) {
          draft.text.hasErrors = true
          draft.text.message = "Please enter valid transaction text."
        }
        return
      case "AMOUNT_VALIDATION":
        draft.amount.hasErrors = false
        draft.amount.value = action.value
        if (!draft.amount.value || draft.amount.value == "0") {
          draft.amount.hasErrors = true
          draft.amount.message = "Please enter transaction amount."
        }
        return
      case "SUBMIT":
        if (!draft.text.hasErrors && !draft.amount.hasErrors) {
          draft.submitCount++
        }
        return
      case "FIELDS_INITIALIZATION":
        draft.text.value = ""
        draft.amount.value = ""
        return
    }
  }

  const [state, dispatch] = useImmerReducer(thisReducer, initialState)

  useEffect(() => {
    if (state.submitCount) {
      const thisRequest = Axios.CancelToken.source()
      async function createOne() {
        try {
          const response = await Axios.post("/api/v1/transactions", {
            text: state.text.value,
            amount: parseInt(state.amount.value)
          })
          const newTransaction = response.data.data
          appDispatch({
            type: "ADD",
            value: {
              _id: newTransaction._id,
              text: newTransaction.text,
              amount: newTransaction.amount
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
      createOne()
      dispatch({ type: "FIELDS_INITIALIZATION" })
      return thisRequest.cancel()
    }
  }, [state.submitCount])

  function submitHandler(e) {
    e.preventDefault()
    dispatch({ type: "TEXT_VALIDATION", value: state.text.value })
    dispatch({ type: "AMOUNT_VALIDATION", value: state.amount.value })
    dispatch({ type: "SUBMIT" })
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input value={state.text.value} onChange={e => dispatch({ type: "TEXT_VALIDATION", value: e.target.value })} type="text" placeholder="Enter text..." />
          <CSSTransition in={state.text.hasErrors} timeout={200} classNames="validation-msg" unmountOnExit>
            <div className="alert-error validation-msg">{state.text.message}</div>
          </CSSTransition>
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input value={state.amount.value} onChange={e => dispatch({ type: "AMOUNT_VALIDATION", value: e.target.value })} type="number" placeholder="Enter amount..." />
          <CSSTransition in={state.amount.hasErrors} timeout={200} classNames="validationMessage" unmountOnExit>
            <div className="alert-error validationMessage">{state.amount.message}</div>
          </CSSTransition>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}

export default AddTransaction
