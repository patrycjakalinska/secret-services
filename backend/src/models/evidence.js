const mongoose = require('mongoose')
const Photo = require('./photo')

const evidenceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  photos: [Photo.schema],
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
  },
})

module.exports = mongoose.model('Evidence', evidenceSchema)
