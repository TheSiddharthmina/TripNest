const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddharthmina121@gmail.com",
    pass: "rabs hqtd nqkt vfhn" 
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"TripNest Support" <siddharthmina121@gmail.com>',
      to,
      subject,
      html
    });
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error);
  }
};

module.exports = sendEmail;
