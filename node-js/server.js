const express = require("express")
const app = express()
const path = require("path")

const PORT = process.env.PORT || 3000

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", {
  //     root: __dirname,
  //   })
  res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

// redirects
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html")
})

// 404 page
app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname, "views", "404.html")
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
