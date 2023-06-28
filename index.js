const express = require("express")
const app = express()
const port = 3000

// Making GET req
app.get("/", (req, res) => {
  res.send("Hello HTTP Server!")
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
