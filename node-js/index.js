const express = require("express")
const app = express()
const path = require("path")

const PORT = process.env.PORT || 3000

// Built in middlewares to handle urlencoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }))

// built in middleware for json
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
  //   res.send("Hello from Express Server")
  res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

app.get("/*", (req, res) => res.status(404).send("Page not found"))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
