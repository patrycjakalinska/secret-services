const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { mail, password } = req.body

  try {
    const user = await User.findOne({ mail })

    if (!user) {
      return res.status(401).json({ message: 'Wrong credentials' })
    }

    console.log(password)
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, mail: user.mail },
      process.env.SECRET,
      { expiresIn: 365 * 24 * 60 * 60 }
    )

    res.status(200).json({
      token,
      mail: user.mail,
      name: user.name,
      surname: user.surname,
      cases: user.cases,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
module.exports = loginRouter
