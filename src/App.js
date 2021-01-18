import React, { useReducer } from "react"
import ReactDOM from "react-dom"

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
