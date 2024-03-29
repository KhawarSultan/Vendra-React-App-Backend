// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  totalCost: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  customerInfo:{
    type: Object,
    required:true,
  },
  status: {
    type: String,
    default: 'Pending', // You can set a default status
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
