const express = require('express')
const evidenceRouter = express.Router()
const Evidence = require('../models/evidence')
const verifyToken = require('../utils/auth')

evidenceRouter.get('/', verifyToken, async (req, res) => {
  try {
    const allEvidence = await Evidence.find({})
    return res.status(200).json(allEvidence)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

evidenceRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const evidence = await Evidence.findById(id)
    if (!evidence) {
      return res.status(404).json({ error: 'Evidence not found.' })
    }
    return res.status(200).json(evidence)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

module.exports = evidenceRouter
