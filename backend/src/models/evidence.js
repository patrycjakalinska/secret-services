const mongoose = require('mongoose')
const Photo = require('./photo')

const evidenceSchema = new mongoose.Schema({
  title: String,
  location: String,
  geometry: {
    longitude: String,
    latitude: String,
  },
  date: Date,
  description: String,
  photos: [Photo.schema],
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
  },
})

evidenceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Evidence', evidenceSchema)
