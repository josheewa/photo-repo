// api/send-email.js
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  limiter(req, res, async () => {
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
      console.error('Error sending email:', error);

      // Check if the error is due to rate limiting
      if (error && error.message === 'Too many requests, please try again later.') {
        res.status(429).send('Rate limit exceeded. Please try again later.')
        console.error('Error sending email: Rate limit exceeded. Please try again later.')
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  })
}
