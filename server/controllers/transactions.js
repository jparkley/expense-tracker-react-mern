const Transaction = require("../models/Transaction")

exports.getTransactions = async (req, res, next) => {
  let all = await Transaction.findAll()
    .then(function (transactions) {
      res.status(200).json({
        sucess: true,
        count: transactions.length,
        data: transactions
      })
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        error: error
      })
    })
}

exports.addTransaction = (req, res, next) => {
  console.log("req: ", req.body)
  let transaction = new Transaction(req.body)

  transaction
    .createOne()
    .then(function (transactions) {
      res.status(201).json({
        success: true,
        data: transactions
      })
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        error: error
      })
    })
}

exports.deleteTransaction = (req, res, next) => {
  console.log("id", req.params.id)
  Transaction.delete(req.params.id)
    .then(() => {
      res.status(201).json({
        success: true,
        data: "success"
      })
    })
    .catch(e => {
      res.json(e)
    })
}
