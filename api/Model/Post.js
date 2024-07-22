const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ensure title is required
    maxlength: 50 // Maximum length for title
  },
  summary: {
    type: String,
    required: true, // Ensure summary is required
    maxlength: 200 // Maximum length for summary
  },
  content: {
    type: String,
    required: false // Optional content field
  },
  file: {
    type: String,
    required: false // Optional file field
  }
});

module.exports = mongoose.model('Post', postSchema);
