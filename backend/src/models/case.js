const mongoose = require('mongoose')

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

module.exports = mongoose.model('Case', caseSchema)
