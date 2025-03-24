import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: true, 
  port: process.env.EMAIL_PORT,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
  },
}); 

// Controller to send email
const sendEmail = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message; 

  const mailOptions = {
    from: 'contact@raindropcoding.com',
    to: 'dominikucher@hotmail.com', // The recipient's email address based on the selected option
    subject: `Contact Form Submission - ${subject}`,
    text: `This is a message sent from Contact form on GoldingApp website.\nHit "reply" to reply to sender.\n\n${message}`,
    replyTo: `${name} <${email}>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
};

export { sendEmail };
