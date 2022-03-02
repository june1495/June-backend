const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        img: { type: String },
        price: { type: Number },
        desc: { type: String },
        title: { type: String },
        size: { type: String },
        color: { type: String },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Order', OrderSchema);
