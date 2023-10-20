const mongoose = require('mongoose')
const Photo = require('./photo')

const caseSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  location: String,
  interest: {
    type: String,
    minLength: 3,
    required: true,
  },
  photos: [Photo.schema],
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  evidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evidence',
    },
  ],
})

caseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Case', caseSchema)
