const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
})

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200')
})

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
  photos: [
    {
      url: {
        type: String,
      },
      publicId: { type: String },
      tags: [
        {
          type: String,
          default: [],
        },
      ],
    },
  ],
  description: String,
  userId: String,
})

module.exports = mongoose.model('Case', caseSchema)
