const User = require("../model/User")
const bcrypt = require("bcrypt")

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res.status(400).json({
      message: "Username and Password are required.",
    })

  // Check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec()
  if (duplicate) return res.sendStatus(409) //conflict
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10)

    // create and store the new user  => There are other ways to create and store a file like .save() after resolved
    // One-way of creating and storing data in MongoDB
    const result = await User.create({
      username: user,
      password: hashedPwd,
    })

    console.log(result)

    res.status(201).json({ success: `New user ${user} created!` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { handleNewUser }
