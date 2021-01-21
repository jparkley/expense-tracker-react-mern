import React from "react"
import ReactDOMServer from "react-dom/server"
import fs from "fs"
import Header from "./src/components/Header"
import LoadingDots from "./src/components/LoadingDots"

function Shell() {
  return (
    <>
      <Header />
      <div className="loading-container">
        <p className="intro">The site may run slowly because API requests to Heroku are slowly waking up their dyno. =)</p>
        <p className="intro">Front-end built in React hooks (Context and Reducer) and Axios</p>
        <p className="intro">Back-end in Node, Express and MongoDB (MVC architecture)</p>
        <LoadingDots />
      </div>
    </>
  )
}

function html(x) {
  return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Expense Tracker</title>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/App.css" />
  </head>
  <body>
    <div id="app">${x}</div>
  </body>
</html>
`
}

const reactHtml = ReactDOMServer.renderToString(<Shell />)
const resultHtmlString = html(reactHtml)

const fileName = "./src/index-template.html"
const stream = fs.createWriteStream(fileName)
stream.once("open", () => {
  stream.end(resultHtmlString)
})
