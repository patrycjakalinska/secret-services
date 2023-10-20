const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Photo', photoSchema)
