import React, { useEffect, useContext } from "react"
import StateContext from "../context/StateContext"

function Balance() {
  const appState = useContext(StateContext)
  const amounts = appState.transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  )
}

export default Balance
