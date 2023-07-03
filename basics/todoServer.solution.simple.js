const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()

app.use(bodyParser.json())

let todos = fs.readFile("database.js", "utf-8", (err, data) => {
  console.log(data)
})

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i
  }
  return -1
}

function removeAtIndex(arr, index) {
  let newArray = []
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i])
  }
  return newArray
}

// app.get("/", (req, res) => {
//   res.send("Welcomé to Todo app")
// })

app.get("/todos", (req, res) => {
  res.json(todos)
})

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title || "sample title",
    description: req.body.description || "sample desc",
  }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// :id => params
app.delete("/todos/:id", (req, res) => {
  console.log(req.params)
  const todoIndex = findIndex(todos, parseInt(req.params.id))
  if (todoIndex === -1) {
    res.status(404).send()
  } else {
    todos = removeAtIndex(todos, todoIndex)
    res.status(200).send()
  }
})

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send()
})

app.listen(3000, () => console.log("The server running on port 3000"))
