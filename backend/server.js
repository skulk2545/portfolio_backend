const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Email route
app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Project Inquiry",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    res.json({ success: true });

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Render dynamic port binding
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
