const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")

const PORT = process.env.PORT || 3000

// Middlewares
// custom middlware
app.use(logger)

// Cross Origin Resource Sharing
const whitelist = ["http://localhost:3000", "http://127.0.0.1:3000"]
const corsOptions = {
  origin: (origin, callback) => {
    // remove !origin after devolpement
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
    optionsSuccessStatus: 200
  },
}
app.use(cors(corsOptions))

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
//   })
// )

// built-in middleware to handle urlencoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }))

// built-in middlware for json
app.use(express.json())

// serve static files
app.use("/", express.static(path.join(__dirname, "public")))
app.use("/subdir", express.static(path.join(__dirname, "public")))

// routes
app.use("/", require("./routes/root"))
app.use("/subdir", require("./routes/subdir"))
app.use("/employees", require("./routes/api/employees"))

// route handlers
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello.html")
//     next()
//   },
//   (req, res) => {
//     res.send("Hello World")
//   }
// )

// chaining route handlers
// const one = (req, res, next) => {
//   console.log("one")
//   next()
// }

// const two = (req, res, next) => {
//   console.log("two")
//   next()
// }
// const three = (req, res, next) => {
//   console.log("three")
//   res.send("Finished!")
// }

// app.get("/chain(.html)?", [one, two, three])

// 404 page
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(__dirname, "views", "404.html")
// })

//404 alternate way
app.all("*", (req, res) => {
  res.status(404)

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" })
  } else {
    res.type("txt").send("404 Not Found")
  }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
