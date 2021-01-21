export default (state, action) => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        loading: false,
        transactions: action.value
      }
    case "ADD":
      return {
        ...state,
        transactions: [...state.transactions, action.value]
      }
    case "DELETE":
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.value)
      }
  }
}
