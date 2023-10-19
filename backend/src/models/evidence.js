const mongoose = require('mongoose')

const evidenceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
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
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
  },
})

module.exports = mongoose.model('Evidence', evidenceSchema)
