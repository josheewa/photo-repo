// api/send-email.js
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  const { subject, name, email, message } = req.body

  try {
    // Configure nodemailer to send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.TRANSPORT_EMAIL,
        pass: process.env.TRANSPORT_EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.TRANSPORT_EMAIL,
      to: 'jooshtography@gmail.com', // Replace with your photography email
      subject: `${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    await transporter.sendMail(mailOptions)
    res.status(200).send('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send('Internal Server Error')
  }
}
