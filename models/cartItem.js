// Import necessary modules
const mongoose = require('mongoose');

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// Create the CartItem model
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Export the CartItem model
module.exports = CartItem;