const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    await transporter.sendMail({
      from: `"Portfolio Contact" <kshreya0725@gmail.com>`,
      to: "kshreya0725@gmail.com",
      subject: "New Project Inquiry",
      text: `Name: ${name}\nEmail: ${email}\n Phone: ${phone}\n Message: ${message}`
    });

    console.log("EMAIL SENT");
    res.json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

