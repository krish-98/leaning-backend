require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const path = require("path")
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const verifyJWT = require("./middleware/verfiyJWT")
const cookieParser = require("cookie-parser")
const credentials = require("./middleware/credentials")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")

const PORT = process.env.PORT || 3000

// Connecting MongoDB
connectDB()

// Middlewares
// custom middlware
app.use(logger)

// Handle options creditionals check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

// built-in middlware for json
app.use(express.json())

// middleware for cookie parser
app.use(cookieParser())

// serve static files
app.use("/", express.static(path.join(__dirname, "public")))
// app.use("/subdir", express.static(path.join(__dirname, "public")))

// routes
app.use("/", require("./routes/root"))
app.use("/register", require("./routes/register"))
app.use("/auth", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))

// verifyJWT middleware applies to employees route, because it's like a waterfall everything after verifyJWT line, routes come after it uses the verifyJWT middleware for their routes
app.use(verifyJWT)
app.use("/employees", require("./routes/api/employees"))

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

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

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
