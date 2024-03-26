// Import necessary modules
const mongoose = require('mongoose');

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Export the Feedback model
module.exports = Feedback;
