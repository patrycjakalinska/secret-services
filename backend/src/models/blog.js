const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 8,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    minLength: 100,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
