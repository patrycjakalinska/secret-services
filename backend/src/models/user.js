const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    minLength: 6,
    required: true,
    unique: true,
  },
  name: String,
  surname: String,
  passwordHash: String,
  cases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)