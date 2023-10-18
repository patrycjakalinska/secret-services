const express = require('express')
const uploadRouter = express.Router()
const User = require('../models/user')
const Case = require('../models/case')
const cloudinaryConfig = require('../utils/cloudinary')
const verifyToken = require('../utils/auth')
const { classifyImage } = require('../utils/classification')

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
        const removedProfilePic = await cloudinaryConfig.handleDeleteOnePhoto(
          user.profilePicture.publicId
        )
        user.profilePicture.url = imageDetails.secure_url
        user.profilePicture.publicId = imageDetails.public_id

        classifyImage(user.profilePictureURL)

        const savedUser = await user.save()
        return res.json(savedUser)
      }
    } catch (error) {
      console.log(error)
    }
  }
)

uploadRouter.post(
  '/many',
  cloudinaryConfig.upload.array('files'),
  verifyToken,
  async (req, res) => {
    const { files } = req
    if (!files) {
      return res.status(400).json({ error: 'No image files provided.' })
    }

    const caseName = req.body.caseName
    let photoDetails = []

    for (const file of files) {
      try {
        let encoded = file.buffer.toString('base64')
        let imageDetails = await cloudinaryConfig.handleUpload(
          encoded,
          `cases/${caseName}`
        )
        if (imageDetails && imageDetails.secure_url) {
          photoDetails.push({
            url: imageDetails.secure_url,
            publicId: imageDetails.public_id,
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
    return res.json(photoDetails)
  }
)

uploadRouter.delete('/:caseId/:id', async (req, res) => {
  const { caseId, id } = req.params
  //
  try {
    const currentCase = await Case.findById(caseId)
    if (!currentCase) {
      return res.status(404).json({ error: 'Case not found' })
    }

    const photoToDelete = currentCase.photos.find(
      (p) => p._id.toString() === id
    )
    const deleteRes = await cloudinaryConfig.handleDeleteOnePhoto(
      photoToDelete.publicId
    )

    const updatedPhotos = currentCase.photos.filter(
      (p) => p._id.toString() !== id
    )
    currentCase.photos = updatedPhotos

    await currentCase.save()
    res.status(200).json(currentCase)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = uploadRouter
