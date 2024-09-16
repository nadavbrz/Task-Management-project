const nodeMailer = require("nodemailer");
const nodeMailerUsername = process.env.NODEMAILER_USERNAME;
const nodeMailerPassword = process.env.NODEMAILER_PASSWORD;

const sendEmail = async ({ recipient, name, text }) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: nodeMailerUsername, 
      pass: nodeMailerPassword,
    },
  });

  const notificationMailOptions = {
    from: `${nodeMailerUsername}`,
    to: "nadavbrz@gmail.com",
    replyTo: recipient,
    subject: `New Message from: ${name}`,
    text: `You have received a new message from ${name} (${recipient}):\n\n${text}`,
    html: `<p><strong>From:</strong> ${name} (${recipient})</p><p>${text}</p>`,
  };

  const thankYouMailOptions = {
    from: "nadavbrz@gmail.com",
    to: recipient,
    subject: "Thank you for your message!",
    text: `Dear ${name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\n Task Master `,
  };

  try {
    await transporter.sendMail(notificationMailOptions);

    await transporter.sendMail(thankYouMailOptions);

    return { response: true, error: "", message: "Email successfully sent" };
  } catch (err) {
    console.error("Failed sending email:", err);
    return { response: false, error: err.message, message: "Failed to send email" };
  }
};

exports.sendEmail = sendEmail;
