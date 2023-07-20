const mongoose = require("mongoose")

// Incase we have a complex nested Object we can create a separate object schema. it also created a object id
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
})

// Schema Types with Validation
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    // Custom validation
    validate: (v) => v % 2 === 0,
    message: (props) => `${props.value} is not an even number`,
  },
  email: { type: String, minLength: 7, required: true, lowercase: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  // Either create like this or use a separate schema
  // address: {
  //   street: String,
  //   city: String,
  // },
  address: addressSchema,
})

// User is going to be the name of the collection in the database called User
module.exports = mongoose.model("User", userSchema)
