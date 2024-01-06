import Head from 'next/head'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { VscClearAll } from 'react-icons/vsc'

const EmailForm = () => {
  const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }

  const [formData, setFormData] = useState(initialFormData)

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
        // Display success notification
        toast.success('Email sent successfully!')
      } else {
        // Display error notification
        const responseData = await response.json()
        toast.error(
          `Failed to send email. Server returned: ${response.status}. ${responseData.message}`
        )
      }
    } catch (error) {
      // Display error notification
      toast.error(`Error sending email: ${error.message}`)
    }
  }

  const handleClear = () => {
    // Reset the form data to the initial state
    setFormData(initialFormData)
  }

  return (
    <>
      <Head>
        <title>Email Form</title>
        <meta property="og:title" content="Email Form" />
      </Head>
      <h1 className='page-title'>Email form</h1>
      <div className="email-container">
        <form className="email-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="name-email flex w-full flex-row">
              <span className="mr-1">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  key="name"
                />
              </span>

              <span className="ml-1">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your e-mail address"
                  value={formData.email}
                  onChange={handleChange}
                  key="email"
                />
              </span>
            </div>

            <span>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="E-mail subject"
                value={formData.subject}
                onChange={handleChange}
                key="subject"
              />
            </span>
            <span>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
                key="message"
              />
            </span>
          </div>
          <div className="button-container">
            <button className="clear-btn" type="button" onClick={handleClear}>
              <span>
                <VscClearAll />
              </span>
              <span>Clear</span>
            </button>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EmailForm
