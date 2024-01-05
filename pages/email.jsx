import Head from 'next/head'
import React, { useState } from 'react'

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send the form data to the backend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log('Email sent successfully!')
      } else {
        console.error(
          'Failed to send email. Server returned:',
          response.status,
          response.statusText
        )
        const responseData = await response.json()
        console.error('Server response data:', responseData)
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Email Form</title>
        <meta property="og:title" content="Email Form" />
      </Head>
      <div className="email-container">
        <form className="email-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="flex w-full flex-row">
              <span className="mr-1">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" onChange={handleChange} />
              </span>

              <span className="ml-1">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your e-mail address"
                  onChange={handleChange}
                />
              </span>
            </div>

            <span>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="E-mail subject"
                onChange={handleChange}></input>
            </span>
            <span>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Type your message here"
                onChange={handleChange}
              />
            </span>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default EmailForm
