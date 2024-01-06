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
  const [missingFields, setMissingFields] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Remove the field from the missingFields array if it was previously marked as missing
    setMissingFields((prevMissingFields) => prevMissingFields.filter((field) => field !== name))

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check for empty fields
    const missing = Object.keys(formData).filter((key) => !formData[key])
    setMissingFields(missing)

    if (missing.length > 0) {
      toast.error('Please fill in all fields.')
      return
    }

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
        let responseData

        try {
          // Try to parse response as JSON
          responseData = await response.json()
        } catch (jsonError) {
          // If parsing fails, use the plain text response
          if (!response.bodyUsed) {
            responseData = await response.text()
          } else {
            console.error('Response body already read.')
            responseData = 'Unknown error'
          }
        }

        if (response.status === 429) {
          console.error('Error sending email: Rate limit exceeded. Please try again later.')
          toast.error('Rate limit exceeded. Please try again later.')
        } else {
          toast.error(`Failed to send email. Server returned: ${response.status}. ${responseData}`)
        }
      }
    } catch (error) {
      // Display error notification
      toast.error(`Error sending email: ${error.message}`)
    }
  }

  const handleClear = () => {
    // Reset the form data and missing fields
    setFormData(initialFormData)
    setMissingFields([])
  }

  return (
    <>
      <Head>
        <title>Email Form</title>
        <meta property="og:title" content="Email Form" />
      </Head>
      <h1 className="page-title">Email form</h1>
      <div className="email-container">
        <form className="email-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="name-email flex w-full flex-row">
              <span className={`mr-1 ${missingFields.includes('name') ? 'missing' : ''}`}>
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

              <span className={`ml-1 ${missingFields.includes('email') ? 'missing' : ''}`}>
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

            <span className={` ${missingFields.includes('subject') ? 'missing' : ''}`}>
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
            <span className={` ${missingFields.includes('message') ? 'missing' : ''}`}>
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
