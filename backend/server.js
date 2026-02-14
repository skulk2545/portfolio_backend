const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.MY_EMAIL,
      subject: "New Portfolio Inquiry",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    console.log("EMAIL SENT");
    res.json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
