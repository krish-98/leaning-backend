const fs = require("fs")

fs.readFile("sample.txt", "utf-8", (err, data) => {
  console.log(data)
  console.log(err)
})

const calculateSum = (num) => {
  let sum = 0
  for (let i = 0; i < num; i++) {
    sum += i
  }

  return sum
}

const calculatedValue = calculateSum(100)

console.log(calculatedValue)
