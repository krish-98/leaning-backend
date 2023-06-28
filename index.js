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
  res.send("Hello HTTP Server!")
})

const calculateSum = (num = 1) => {
  let sum = 0

  for (let i = 0; i <= num; i++) {
    sum += i
  }

  return sum
}

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

  res.send(`The sum of 1 to ${!counter ? 1 : counter} is ${sumValue}`)
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})

/**
 * To send inputs to the back-end we can use,
 * 1. query params => To acces the query params in the desired router handler (It means when a certain route is hit). We use req.query."keyname"
 * 2. headers => We can't directly send headers via browser URL. It mostly accepts GET req. So we're using POSTMAN to use send POSt req. To acces the headers we use req.headers."keyname"
 * 3. body => Express doesn't give body out of the box. We have to install a library called body-parser and use in the middleware
 *
 *
 */
