const { ObjectID } = require("mongodb")

const transactionsCollection = require("../db").db().collection("transactions")

let Transaction = function (data) {
  this.data = data
  console.log("top: ", this.data)
}

Transaction.prototype.createOne = function () {
  return new Promise((resolve, reject) => {
    console.log("*******", this.data)
    transactionsCollection
      .insertOne(this.data)
      .then(info => {
        resolve(info.ops[0])
      })
      .catch(e => {
        reject(e)
      })
  })
}

Transaction.findAll = function () {
  return new Promise(async (resolve, reject) => {
    try {
      await transactionsCollection.find().toArray(function (error, result) {
        if (error) throw error
        resolve(result)
      })
    } catch (e) {
      reject(e)
    }
  })
}

Transaction.findById = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("here")
      let transaction = await transactionsCollection.findOne({ _id: new ObjectID(id) })
      console.log(transaction)
      if (transaction) {
        console.log("found")
        resolve(transaction)
      } else {
        reject("ERRORS")
      }

      //   await transactionsCollection.findOne({ _id: new ObjectID(id) }).toArray(function (error, result) {
      //     console.log("error:", error)
      //     console.log("r:", result)
      //     if (error) {
      //       console.log(error)
      //       throw error
      //     }
      //     console.log("in findbyid", result)
      //     resolve(result)
      //   })
    } catch (e) {
      reject(e)
    }
  })
}

Transaction.delete = function (id) {
  console.log("in model:", id)
  return new Promise(async (resolve, reject) => {
    try {
      let transaction = await Transaction.findById(id)
      console.log("tra:", transaction)
      if (transaction) {
        await transactionsCollection.deleteOne({ _id: new ObjectID(id) })
        resolve("succeed")
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = Transaction
