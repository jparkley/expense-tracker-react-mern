import React, { useContext, useEffect, useState } from "react"
import DispatchContext from "../context/DispatchContext"
import StateContext from "../context/StateContext"

function TransactionList() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const transactions = appState.transactions

  function deleteHandler(id) {
    const areYouSure = window.confirm("Are you sure?")
    if (areYouSure) {
      appDispatch({ type: "DELETE", value: id })
    }
  }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => {
          return (
            <li key={transaction.id} className={transaction.amount < 0 ? "minus" : "plus"}>
              {transaction.text}{" "}
              <span>
                {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount)}
              </span>
              <a className="delete-btn" onClick={() => deleteHandler(transaction.id)}>
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
