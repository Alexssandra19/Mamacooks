// Import necessary modules
const mongoose = require('mongoose');

// Define the menu item schema
const menuItemSchema = new mongoose.Schema({
  restaurantID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});

// Create the menu item model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Export the menu item model
module.exports = MenuItem;
