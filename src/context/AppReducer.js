export default (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        transactions: [action.value, ...state.transactions]
      }
    case "DELETE":
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.value)
      }
  }
}
