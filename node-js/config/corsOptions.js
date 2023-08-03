const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
  origin: (origin, callback) => {
    // remove !origin after devolpement
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
    optionsSuccessStatus: 200
  },
}

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
//   })
// )

// built-in middleware to handle urlencoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"

module.exports = corsOptions
