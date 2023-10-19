const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')
const Case = require('../models/case')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../utils/auth')
const config = require('../utils/config')

usersRouter.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.user.mail })
    console.log(user)
    if (user.userType === 'admin') {
      const allCases = await Case.find({})
      user.cases = allCases
    } else {
      await user.populate('cases')
    }
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

usersRouter.post('/', async (req, res) => {
  const { mail, password, name, surname } = req.body
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

    const token = jwt.sign(
      { userId: newUser._id, mail: newUser.mail },
      config.SECRET,
      { expiresIn: '1d' }
    )

    const savedUser = await newUser.save()

    return res.status(200).json({ savedUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

usersRouter.put('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.user.mail })
    if (!user) {
      return res.status(400).json({ message: 'User not found.' })
    }
    if (req.body.name) {
      user.name = req.body.name
    }
    if (req.body.surname) {
      user.surname = req.body.surname
    }
    if (req.body.mail) {
      user.mail = req.body.mail
    }
    if (req.body.number) {
      user.number = req.body.number
    }
    if (req.body.gender) {
      user.gender = req.body.gender
    }
    const savedUser = await user.save()
    res.status(200).json(savedUser)
  } catch (err) {
    res.status(400).json({ messgae: 'Something went wrong.' })
  }
})

module.exports = usersRouter
