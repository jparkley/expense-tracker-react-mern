const express = require("express")
const dotenv = require("dotenv")
const router = require("./router")

const server = express()
server.use(express.json()) // bodyparser middleware
dotenv.config()

server.use("/api/v1/transactions", router)

module.exports = server
