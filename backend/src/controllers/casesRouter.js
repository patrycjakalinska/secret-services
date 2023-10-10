const express = require('express')
const casesRouter = express.Router()
const Case = require('../models/case')
const User = require('../models/user')
const verifyToken = require('../utils/auth')

casesRouter.get('/', verifyToken, async (req, res) => {
  const casesForUser = await Case.find({ userId: req.user.userId })
  res.status(200).json({ casesForUser })
})

casesRouter.post('/', verifyToken, async (req, res) => {
  const newCase = new Case({
    name: req.body.name,
    location: req.body.location,
    interest: req.body.interest,
    photos: req.body.photos,
    description: req.body.description,
    userId: req.user.userId,
  })
  //cas.photos = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { $push: { cases: newCase } },
    { new: true }
  )
  await updatedUser.save()
  const savedCaseForUser = await newCase.save()
  return res.status(200).json({ savedCaseForUser })
})

casesRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const caseId = req.params.id

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { cases: caseId } },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const removedCase = await Case.findByIdAndRemove(caseId)

    if (!removedCase) {
      return res.json(404).json({ error: 'Case not found.' })
    }

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
