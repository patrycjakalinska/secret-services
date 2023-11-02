const express = require('express')
const casesRouter = express.Router()
const Case = require('../models/case')
const User = require('../models/user')
const verifyToken = require('../utils/auth')
const cloudinaryConfig = require('../utils/cloudinary')
const Evidence = require('../models/evidence')
const { classifyImage } = require('../utils/classification')

casesRouter.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.userType === 'admin') {
      const allCases = await Case.find({}).populate('evidence')
      return res.status(200).json(allCases)
    }

    const casesForUser = await Case.find({ user: req.user.userId }).populate(
      'evidence'
    )

    res.status(200).json(casesForUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

casesRouter.post(
  '/',
  cloudinaryConfig.upload.array('files'),
  verifyToken,
  async (req, res) => {
    const { files } = req
    const session = await Case.startSession()

    try {
      session.startTransaction()

      const newCase = new Case({
        name: req.body.name,
        location: req.body.location,
        interest: req.body.interest,
        photos: [],
        description: req.body.description,
        user: req.user.userId,
      })

      if (files) {
        const uploadPromises = files.map(async (file) => {
          try {
            const classification = await classifyImage(file.buffer)
            let encoded = file.buffer.toString('base64')
            let imageDetails = await cloudinaryConfig.handleUpload(
              encoded,
              `cases/${newCase.name.trim()}`
            )

            if (imageDetails && imageDetails.secure_url) {
              newCase.photos.push({
                url: imageDetails.secure_url,
                publicId: imageDetails.public_id,
                tags: classification,
              })
            }
          } catch (err) {
            session.endSession()
            throw new Error('Error while uploading files: ' + err)
          }
        })

        await Promise.all(uploadPromises)
      }

      const savedCase = await newCase.save({ session })
      const adminUsers = await User.find({ userType: 'admin' })
        .select('cases')
        .session(session)

      if (adminUsers.length > 0) {
        const updatePromises = adminUsers.map(async (admin) => {
          admin.cases.push(savedCase)
          return admin.save({ session })
        })

        try {
          await Promise.all(updatePromises)
        } catch (err) {
          session.endSession()
          console.error('Error updating admin users:', err)
          return res.status(500).json({ error: 'Error updating admin users.' })
        }
      } else {
        console.log('No admin users found')
      }

      await session.commitTransaction()

      session.endSession()

      return res.status(201).json(savedCase)
    } catch (err) {
      console.log(err)
      session.endSession()
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
)

casesRouter.put(
  '/:id/photos',
  cloudinaryConfig.upload.array('files'),
  verifyToken,
  async (req, res) => {
    const { id } = req.params
    const { files } = req

    const currentCase = await Case.findById(id)

    if (!files) {
      return res.status(400).json({ error: 'No image files provided.' })
    }

    const uploadPromises = files.map(async (file) => {
      try {
        const classification = await classifyImage(file.buffer)
        let encoded = file.buffer.toString('base64')
        let imageDetails = await cloudinaryConfig.handleUpload(
          encoded,
          `cases/${currentCase.name.trim()}`
        )
        if (imageDetails && imageDetails.secure_url) {
          currentCase.photos.push({
            url: imageDetails.secure_url,
            publicId: imageDetails.public_id,
            tags: classification,
          })
        }
      } catch (err) {
        throw new Error('Error while uploading files: ' + err)
      }
    })
    await Promise.all(uploadPromises)

    const savedCase = await currentCase.save()
    return res.status(200).json(savedCase)
  }
)

casesRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const caseForUser = await Case.findById(req.params.id)
    if (!caseForUser) {
      return res.status(404).json({ message: 'Case not found.' })
    }
    const user = await User.findById(req.user.userId)
    if (user.cases.includes(caseForUser._id)) {
      res.status(200).json({ caseForUser })
    } else {
      res.status(401).json({ message: 'Access denied.' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

casesRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const caseId = req.params.id
    const user = await User.findById(req.user.userId)
    const currentCaseEvidence = await Evidence.find({ case: caseId })
    const currentCase = await Case.findById(caseId)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    if (!currentCase) {
      return res.json(404).json({ error: 'Case not found.' })
    }

    if (!user.cases.includes(caseId)) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    user.cases.pull(caseId)
    await user.save()

    const evidences = currentCase.evidence
    for (let evidence of evidences) {
      for (let photo of evidence.photos) {
        await cloudinaryConfig.handleDeleteOnePhoto(photo.publicId)
      }
    }

    for (let photo of currentCase.photos) {
      await cloudinaryConfig.handleDeleteCase(photo.publicId, currentCase.name)
    }

    if (currentCaseEvidence.length > 0) {
      await Evidence.deleteMany({
        _id: { $in: currentCaseEvidence.map((e) => e._id) },
      }) // Delete all documents in the array
    }

    await Case.deleteOne({ _id: caseId })

    return res.status(200).json({ message: 'Case removed successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

casesRouter.delete('/:id/:photoId', async (req, res) => {
  const { id, photoId } = req.params

  try {
    const currentCase = await Case.findById(id)

    if (!currentCase) {
      return res.status(404).json({ error: 'Case not found' })
    }

    const photoToDelete = currentCase.photos.id(photoId)

    if (!photoToDelete) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    await cloudinaryConfig.handleDeleteOnePhoto(photoToDelete.publicId)
    const filtered = currentCase.photos.filter(
      (p) => p._id.toString() !== photoId
    )
    currentCase.photos = filtered

    await currentCase.save()

    res.status(200).json(currentCase)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

casesRouter.get('/:id/evidence', verifyToken, async (req, res) => {
  const caseId = req.params.id

  try {
    const currentCase = await Case.findById(caseId).populate('evidence')
    const user = await User.findById(req.user.userId)

    if (!currentCase) {
      return res.status(404).json({ message: 'Case not found' })
    }
    if (!user.cases.includes(currentCase._id)) {
      res.status(401).json({ message: 'Access denied.' })
    }

    const { evidence } = currentCase

    res.status(200).json(evidence)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

casesRouter.post(
  '/:id/evidence',
  cloudinaryConfig.upload.array('files'),
  verifyToken,
  async (req, res) => {
    const { id } = req.params
    const { files } = req

    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized.' })
    }

    const session = await Case.startSession()

    try {
      session.startTransaction()

      const currentCase = await Case.findById(id).session(session)

      if (!currentCase) {
        return res.status(404).json({ error: 'Case not found.' })
      }

      const newEvidence = new Evidence({
        title: req.body.title,
        location: req.body.location,
        geometry: {
          longitude: req.body.longitude,
          latitude: req.body.latitude,
        },
        date: Date.now(),
        description: req.body.description,
        case: currentCase,
        photos: [],
      })

      if (files) {
        const uploadPromises = files.map(async (file) => {
          try {
            const classification = await classifyImage(file.buffer)
            let encoded = file.buffer.toString('base64')
            let imageDetails = await cloudinaryConfig.handleUpload(
              encoded,
              `cases/${currentCase.name.trim()}/evidence`
            )

            if (imageDetails && imageDetails.secure_url) {
              newEvidence.photos.push({
                url: imageDetails.secure_url,
                publicId: imageDetails.public_id,
                tags: classification,
              })
            }
          } catch (err) {
            session.endSession()
            throw new Error('Error while uploading files: ' + err)
          }
        })

        await Promise.all(uploadPromises)
      }

      const savedEvidence = await newEvidence.save({ session })

      currentCase.evidence = [...currentCase.evidence, savedEvidence]
      const savedCase = await currentCase.save({ session })
      const populatedCase = await savedCase.populate('evidence')

      await session.commitTransaction()
      session.endSession()

      return res
        .status(200)
        .json({ case: populatedCase, evidenceId: savedEvidence._id })
    } catch (error) {
      session.endSession()
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
)

casesRouter.delete(
  '/:id/evidence/:evidenceId',
  verifyToken,
  async (req, res) => {
    try {
      const { id, evidenceId } = req.params

      const currentCase = await Case.findById(id)
      const currentEvidence = await Evidence.findById(evidenceId)

      if (!currentEvidence) {
        return res.status(404).json({ error: 'Evidence not found.' })
      }

      if (!currentCase) {
        return res.json(404).json({ error: 'Case not found.' })
      }

      currentCase.evidence.pull(evidenceId)
      await currentCase.save()

      for (let photo of currentEvidence.photos) {
        await cloudinaryConfig.handleDeleteOnePhoto(photo.publicId)
      }

      await Evidence.deleteOne({ _id: evidenceId })

      return res.status(200).json({ message: 'Case removed successfully.' })
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }
)

module.exports = casesRouter
