const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const verifyToken = require("../middleware/firebaseAuth");
const sendEmail = require("../utils/sendEmail");

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name, email, phone, destination, travelDate, checkoutDate,
      numPeople, roomType, message
    } = req.body;

    const booking = new Booking({
      userUid: req.user.uid,
      name,
      email,
      phone,
      destination,
      travelDate,
      checkoutDate,
      numPeople,
      roomType,
      message
    });

    await booking.save();
    const subject = "TripNest Booking Confirmation";
    const html = `
      <h2>Hi ${name},</h2>
      <p>Thanks for booking with <b>TripNest</b>!</p>
      <p><b>Details:</b><br>
      Destination: ${destination}<br>
      Check-in: ${travelDate}<br>
      Check-out: ${checkoutDate}<br>
      Room Type: ${roomType || "N/A"}<br>
      People: ${numPeople}</p>
      <p>We’ll reach out if we need more info. Safe travels! 🧳</p>
    `;

    await sendEmail(email, subject, html);

    res.status(201).json({ success: true, message: "Booking saved & email sent!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Booking failed." });
  }
});

module.exports = router;

router.get("/all", verifyToken, async (req, res) => {
  if (req.user.email !== "siddharthmina121@gmail.com")
    return res.status(403).send("Admin only");

  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).send("Error fetching bookings");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.email !== "siddharthmina121@gmail.com")
    return res.status(403).send("Admin only");

  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Delete failed");
  }
});
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = new Booking({
      userUid: req.user.uid,
      ...req.body
    });

    await booking.save();
    res.status(201).json({ success: true, message: "Booking saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userUid: req.user.uid }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user bookings" });
  }
});
