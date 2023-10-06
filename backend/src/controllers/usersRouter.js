const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../utils/auth')

usersRouter.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.user.mail })
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

usersRouter.post('/', async (req, res) => {
  const { mail, password, name, surname } = req.body
  console.log(req.body)
  if (!(password && mail)) {
    res.status(400).json({ error: 'Invalid credentials.' }).end()
  } else if (password.length < 3 || mail.length < 3) {
    res
      .status(400)
      .json({
        error: 'Password and/or mail should be at least 3 characters long',
      })
      .end()
  }

  try {
    const existingUser = await User.findOne({ mail })
    if (existingUser) {
      res
        .status(400)
        .json({ message: 'User is already registered with that e-mail' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      mail,
      passwordHash,
      name,
      surname,
      cases: [],
    })
    console.log(newUser)

    // const token = jwt.sign(
    //   { userId: newUser._id, mail: newUser.mail },
    //   { expiresIn: 365 * 24 * 60 * 60 }
    // )

    const savedUser = await newUser.save()

    return res.status(200).json({ savedUser })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

module.exports = usersRouter
