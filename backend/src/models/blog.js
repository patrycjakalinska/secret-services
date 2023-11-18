const mongoose = require('mongoose')
const Photo = require('./photo')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    default: '#FEFDFD',
  },
  dateColor: {
    type: String,
    default: 'rgba(254, 253, 253, 0.70)',
  },
  photo: Photo.schema,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
