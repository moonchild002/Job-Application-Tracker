"use client"

import { useState } from 'react'
import { submitContact } from '../services/jobService.js'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    nic: '',
    dob: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const validate = (values) => {
    const next = {}
    if (!values.name?.trim()) next.name = 'Name is required'

    if (!values.email?.trim()) {
      next.email = 'Email is required'
    } else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRe.test(values.email)) next.email = 'Enter a valid email address'
    }

    if (values.phone?.trim()) {
      const digits = values.phone.replace(/\D/g, '')
      if (digits.length < 7 || digits.length > 15) next.phone = 'Phone should be 7-15 digits'
    }

    if (values.nic?.trim()) {
      const nicRe = /^[A-Za-z0-9]{5,20}$/
      if (!nicRe.test(values.nic)) next.nic = 'NIC should be 5-20 letters/numbers'
    }

    if (values.dob) {
      const inputDate = new Date(values.dob)
      const today = new Date()
      if (isNaN(inputDate.getTime())) {
        next.dob = 'Invalid date'
      } else if (inputDate > today) {
        next.dob = 'Date of birth cannot be in the future'
      }
    }

    if (!values.message?.trim()) {
      next.message = 'Message is required'
    } else if (values.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters'
    }

    return next
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const updated = { ...errors }
      delete updated[name]
      setErrors(updated)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length) return

    setSubmitting(true)
    setResult(null)
    try {
      const resp = await submitContact(form)
      if (resp?.success) {
        setResult({ type: 'success', message: 'Your message has been sent successfully.' })
        setForm({ name: '', phone: '', email: '', address: '', nic: '', dob: '', message: '' })
      } else {
        setResult({ type: 'error', message: resp?.error || 'Failed to send message.' })
      }
    } catch (err) {
      setResult({ type: 'error', message: err?.response?.data?.error || 'Failed to send message.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-card-foreground">Contact Us</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-6">
          {result && (
            <div className={`p-3 rounded-md ${result.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {result.message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Name</label>
              <input name="name" value={form.name} onChange={onChange} required className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-400' : ''}`} placeholder="Enter your name" />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
              <input name="phone" value={form.phone} onChange={onChange} className={`w-full border rounded-md px-3 py-2 ${errors.phone ? 'border-red-400' : ''}`} placeholder="Enter your phone" inputMode="tel" />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required className={`w-full border rounded-md px-3 py-2 ${errors.email ? 'border-red-400' : ''}`} placeholder="Enter your email" />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">NIC</label>
              <input name="nic" value={form.nic} onChange={onChange} className={`w-full border rounded-md px-3 py-2 ${errors.nic ? 'border-red-400' : ''}`} placeholder="Enter your NIC" />
              {errors.nic && <p className="mt-1 text-xs text-red-600">{errors.nic}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={onChange} className={`w-full border rounded-md px-3 py-2 ${errors.dob ? 'border-red-400' : ''}`} />
              {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-1">Address</label>
              <input name="address" value={form.address} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="Enter your address" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Message</label>
            <textarea name="message" value={form.message} onChange={onChange} required rows="5" className={`w-full border rounded-md px-3 py-2 ${errors.message ? 'border-red-400' : ''}`} placeholder="Write your message here (min 10 characters)" />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50">
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
 