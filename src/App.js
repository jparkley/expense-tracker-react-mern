import React, { useEffect, useReducer } from "react"
import ReactDOM from "react-dom"
import Axios from "axios"

import StateContext from "./context/StateContext"
import DispatchContext from "./context/DispatchContext"
import appReducer from "./context/AppReducer"
import Header from "./components/Header"
import Balance from "./components/Balance"
import IncomeExpenses from "./components/IncomeExpenses"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"

function App() {
  const initialState = {
    transactions: []
  }
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    try {
      async function fetchTransactions() {
        const data = await Axios.get("/api/v1/transactions")
        console.log("after call data: ", data)
      }
      fetchTransactions()
    } catch (e) {
      console.log(e)
    }
    return
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Header />
        <div className="container">
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
ReactDOM.render(<App />, document.querySelector("#app"))
// if (module.hot) {
//   module.hot.accept()
// }
