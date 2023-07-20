const mongoose = require("mongoose")
const User = require("./User")

mongoose.connect("mongodb://127.0.0.1:27017/testdb")

console.log(User)

const run = async () => {
  try {
    // Create a user with 2 different ways
    // method 1
    const user = await User.create({
      name: "Mahinavi",
      age: 2,
      hobbies: ["Eating Lollipop", "Dancing", "Sleeping"],
      address: {
        street: "Main street",
        city: "Manhattan",
      },
      email: "Mk@GMAIl.com",
    })

    // method 2
    //   const user = new User({
    //     name: "Murali Krishnan",
    //     age: 25,
    //   })
    //   await user.save()

    //   Updating the user
    // user.name = "Murali Krishnan"
    // user.save()

    console.log(user)
  } catch (err) {
    console.log(err.message)
  }
}

run()
