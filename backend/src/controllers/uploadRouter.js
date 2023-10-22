const express = require('express')
const uploadRouter = express.Router()
const User = require('../models/user')
const Case = require('../models/case')
const cloudinaryConfig = require('../utils/cloudinary')
const verifyToken = require('../utils/auth')
const { classifyImage } = require('../utils/classification')
const { Worker, isMainThread } = require('worker_threads')

uploadRouter.post(
  '/profilePic',
  cloudinaryConfig.upload.single('file'),
  verifyToken,
  async (req, res) => {
    try {
      const { file } = req
      if (!file) {
        return res.status(400).json({ error: 'No image file provided.' })
      }

      const encoded = file.buffer.toString('base64')
      const imageDetails = await cloudinaryConfig.handleUpload(
        encoded,
        `profilePicture/${req.user.mail}`
      )

      if (imageDetails) {
        const user = await User.findOne({ mail: req.user.mail })
        await cloudinaryConfig.handleDeleteOnePhoto(
          user.profilePicture.publicId
        )
        user.profilePicture.url = imageDetails.secure_url
        user.profilePicture.publicId = imageDetails.public_id

        const savedUser = await user.save()
        return res.json(savedUser)
      }
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = uploadRouter
