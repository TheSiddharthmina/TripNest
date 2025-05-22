const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  description: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
