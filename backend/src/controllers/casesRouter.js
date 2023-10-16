const express = require('express')
const casesRouter = express.Router()
const Case = require('../models/case')
const User = require('../models/user')
const verifyToken = require('../utils/auth')
const cloudinaryConfig = require('../utils/cloudinary')

casesRouter.get('/', async (req, res) => {
  const casesForUser = await Case.find({})
  res.status(200).json(casesForUser)
})

casesRouter.post('/', verifyToken, async (req, res) => {
  const newCase = new Case({
    name: req.body.name,
    location: req.body.location,
    interest: req.body.interest,
    photos: [],
    description: req.body.description,
    userId: req.user.userId,
  })

  for (const photo of req.body.photos) {
    newCase.photos.push({
      url: photo.url,
      publicId: photo.publicId,
    })
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { $push: { cases: newCase } },
    { new: true }
  )

  const updateAdmins = await User.find({ userType: 'admin' })
  updateAdmins.forEach(async (admin) => {
    admin.cases.push(newCase)
    await admin.save()
  })

  await updatedUser.save()
  const savedCaseForUser = await newCase.save()
  return res.status(200).json(savedCaseForUser)
})

casesRouter.put('/:id/addPhotos', verifyToken, async (req, res) => {
  try {
    console.log(req)
    console.log(req.body)
    console.log(req.params)
    const caseId = req.params.id
    const currentCase = await Case.findById(caseId)
    console.log(currentCase)
    for (let photo of req.body) {
      currentCase.photos.push({ url: photo.url, publicId: photo.publicId })
    }
    const savedCase = await currentCase.save()
    res.status(200).json(savedCase)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

casesRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const caseId = req.params.id

    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    } else if (!user.cases.includes(caseId)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    user.cases.pull(caseId)
    await user.save()

    const currentCase = await Case.findById(caseId)

    if (!currentCase) {
      return res.json(404).json({ error: 'Case not found.' })
    }

    for (let photo of currentCase.photos) {
      let removedCloud = await cloudinaryConfig.handleDeleteCase(
        photo.publicId,
        currentCase.name
      )
    }

    await Case.deleteOne({ _id: caseId })

    return res.status(200).json({ message: 'Case removed successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

casesRouter.get('/:id', verifyToken, async (req, res) => {
  const caseForUser = await Case.findById(req.params.id)
  const user = await User.findById(req.user.userId)
  if (user.cases.includes(caseForUser._id)) {
    res.status(200).json({ caseForUser })
  } else {
    res.status(401).json({ message: 'Access denied.' })
  }
})

module.exports = casesRouter
