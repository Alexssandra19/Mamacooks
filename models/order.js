// Import necessary modules
const mongoose = require('mongoose');

// Define the order schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['credit', 'paypal', 'cash']},
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' },
});

// Create a model from the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;