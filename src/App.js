import React, { useEffect, useReducer } from "react"
import ReactDOM from "react-dom"
import Axios from "axios"
//import dotenv from "dotenv"

import StateContext from "./context/StateContext"
import DispatchContext from "./context/DispatchContext"
import appReducer from "./context/AppReducer"
import Header from "./components/Header"
import Balance from "./components/Balance"
import IncomeExpenses from "./components/IncomeExpenses"
import TransactionList from "./components/TransactionList"
import AddTransaction from "./components/AddTransaction"
import LoadingDots from "./components/LoadingDots"

// dotenv.config() // receives this from webpack build
Axios.defaults.baseURL = process.env.BACKENDURL || "https://expense-tracker-react-mern.herokuapp.com"
console.log("BaseURL: ", Axios.defaults.baseURL)

function App() {
  const initialState = {
    transactions: [],
    loading: true
  }
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    try {
      async function fetchTransactions() {
        const transactions = await Axios.get("/api/v1/transactions")
        console.log(transactions)
        dispatch({ type: "FETCH", value: transactions.data })
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
        {state.loading && <LoadingDots />}
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
