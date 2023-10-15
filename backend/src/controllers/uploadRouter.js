const express = require('express')
const uploadRouter = express.Router()
const User = require('../models/user')
const cloudinaryConfig = require('../utils/cloudinary')
const verifyToken = require('../utils/auth')

uploadRouter.post(
  '/',
  cloudinaryConfig.upload.single('file'),
  verifyToken,
  async (req, res) => {
    try {
      const { file } = req
      if (!file) {
        return res.status(400).json({ error: 'No imgae file provided.' })
      }

      const encoded = file.buffer.toString('base64')
      const imageDetails = await cloudinaryConfig.handleUpload(encoded)

      if (imageDetails) {
        const user = await User.findOne({ mail: req.user.mail })
        user.profilePictureURL = imageDetails.secure_url
        const savedUser = await user.save()
        return res.json(savedUser)
      }
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = uploadRouter
