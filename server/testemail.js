const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddharthmina121@gmail.com",
    pass: "yebr qnxj fsim bftn"
  }
});

async function test() {
  try {
    console.log("⏳ Sending test email...");

    const info = await transporter.sendMail({
      from: '"TripNest Test" <siddharthmina121@gmail.com>',
      to: "your-second-email@gmail.com", // Change this to your other Gmail
      subject: "✅ TripNest Email Test",
      html: "<h2>Hello!</h2><p>This is a test email from your TripNest backend.</p>"
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}

test();
