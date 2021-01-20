import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import DispatchContext from "../context/DispatchContext"
import StateContext from "../context/StateContext"

function TransactionList() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const transactions = appState.transactions

  async function deleteHandler(_id) {
    const areYouSure = window.confirm("Are you sure?")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/api/v1/transactions/${_id}`)
        if (response.data == "SUCCESS") {
          appDispatch({ type: "DELETE", value: _id })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => {
          return (
            <li key={transaction._id} className={transaction.amount < 0 ? "minus" : "plus"}>
              {transaction.text}{" "}
              <span>
                {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount)}
              </span>
              <a className="delete-btn" onClick={() => deleteHandler(transaction._id)}>
                x
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TransactionList
