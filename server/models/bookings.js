const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userUid: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
  destination: String,
  travelDate: String,
  checkoutDate: String,
  numPeople: Number,
  roomType: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
