const express = require("express");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  const { recipient, name, text } = req.body;

  if (!recipient || !name || !text) {
    return res.status(400).json({ message: "Please provide recipient, name, and text." });
  }

  try {
    const emailResponse = await sendEmail({ recipient, name, text });

    if (emailResponse.response) {
      res.status(200).json({ message: "Email sent successfully." });
    } else {
      res.status(500).json({ message: "Email sending failed.", error: emailResponse.error });
    }
  } catch (error) {
    console.error("Error in sending email route:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
