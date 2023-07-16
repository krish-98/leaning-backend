// const os = require("os")
// const path = require("path")

// // console.log(os)
// // console.log(path)

// console.log(__dirname)
// console.log(__filename)

const fs = require("fs")
const path = require("path")

// Reading File
// Hardcoding the file path
// fs.readFile("./files/users.txt", "utf-8", (err, data) => {
//   if (err) throw err

//   console.log(data.toString())
// })

// filepath using path module
fs.readFile(path.join(__dirname, "files", "data.txt"), "utf-8", (err, data) => {
  if (err) throw err

  console.log("Reading", data.toString(), "complete")
})

// Writing File
fs.writeFile(
  path.join(__dirname, "files", "new.txt"),
  "I was created by node's fs module",
  (err) => {
    if (err) throw err
    console.log("Write complete")
  }
)

// Editing the file => if no such file exist on the directory, It will create a new one
fs.appendFile(
  path.join(__dirname, "files", "updated.txt"),
  "updating using fs module",
  (err) => {
    if (err) throw err
    console.log("Append complete")
  }
)

console.log("Hello, I'm first because, fs modules functions are async")
