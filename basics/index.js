const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = 3000

// Count how many requests are coming in
let totalNumber = 0
const noOfRequestsMiddleware = (req, res, next) => {
  totalNumber += 1
  console.log(totalNumber)
  next()
}

// Simple first middleware
const middleware1 = (req, res, next) => {
  console.log("This is inside middleware " + req.headers.counter)
  next()
}

// Calling middlwares
app.use(bodyParser.json())
app.use(noOfRequestsMiddleware)
app.use(middleware1)

// Making GET req
app.get("/", (req, res) => {
  // Sends plain text
  // res.send("Hello HTTP Server!")

  // Sends HTML
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Bonjour!</h1>
    </body>
  </html>
  `)

  // Sends JSON
  // res.send({ name: "Murali Krishnan" })
})

const calculateSum = (num) => {
  let sum = 0

  for (let i = 1; i <= num; i++) {
    sum += i
  }

  return sum
}

const calculateMul = (num) => {
  let multiple = 1

  for (let i = 1; i <= num; i++) {
    multiple *= i
  }
  return multiple
}

app.get("/handleSum", (req, res) => {
  const counter = req.query.counter

  const sumValue = calculateSum(counter)
  const multipleValue = calculateMul(counter)

  const answerObject = {
    sum: sumValue,
    multiple: multipleValue,
  }

  res.send(answerObject)
})

// Making POST Req
app.post("/handleSum", (req, res) => {
  // Getting query params
  // const counter = req.query.counter
  // const sumValue = calculateSum(counter)

  // Getting headers data
  // console.log(req.headers)
  // const counter = req.headers.counter
  // const sumValue = calculateSum(counter)

  // console.log(req.body)
  const counter = req.body.counter

  const sumValue = calculateSum(counter)
  const multipleValue = calculateMul(counter)

  const answerObject = {
    sum: sumValue,
    multiple: multipleValue,
  }

  res.send(answerObject)
})

// We can change the status code
app.get("/howdy", (req, res) => {
  res.status(401).send("Yeah, I'm good man")
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})

/**
 * To send inputs to the back-end we can use,
 * 1. query params => To acces the query params in the desired router handler (It means when a certain route is hit). We use req.query."keyname"
 * 2. headers => We can't directly send headers via browser URL. It mostly accepts GET req. So we're using POSTMAN to use send POSt req. To acces the headers we use req.headers."keyname"
 * 3. body => Express doesn't give body out of the box. We have to install a library called body-parser and use it in the middleware
 *
 *
 */

/**
 * What does Server send?
 * Server sends 3 things
 * 1. Status code
 * 2. Body (In the body it can send Plain text, JSON or HTML File)
 * 3.
 *
 */

/**
 * We've seen 3 ways to send request to the server
 * 1. via Browser
 * 2. via Postman
 * 3. via a nodeJS Process
 *
 *
 *
 */
