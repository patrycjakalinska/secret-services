const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  color: {
    type: String,
    default: '#EC6D62',
  },
  buttonHover: {
    type: String,
    default: '#EC6D62',
  },
  buttonText: {
    type: String,
    default: '#FEFDFD',
  },
  isPayed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Service', serviceSchema)
