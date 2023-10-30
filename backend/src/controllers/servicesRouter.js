const express = require('express')
const servicesRouter = express.Router()
const verifyToken = require('../utils/auth')
const Service = require('../models/service')

servicesRouter.get('/', async (req, res) => {
  try {
    const services = await Service.find({})
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

servicesRouter.post('/', verifyToken, async (req, res) => {
  try {
    if (req.user.userType === 'admin') {
      const newService = new Service(req.body)
      const savedService = await newService.save()
      res.status(201).json(savedService)
    } else {
      res.status(401).json({ error: 'Unauthorized.' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

module.exports = servicesRouter
