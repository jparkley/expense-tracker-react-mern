const dotenv = require("dotenv")
dotenv.config()
const mongodb = require("mongodb")

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log("Error: ", err)
    process.exit(1)
  }

  module.exports = client
  const server = require("./server")
  //server.listen(process.env.PORT || 5000, console.log("Server started"))
  server.listen(5000, console.log("Server started"))
})
