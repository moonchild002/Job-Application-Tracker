"use client"

import { useState } from "react"
import {
  PlusIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

const statuses = ["Applied", "Interview", "Rejected", "Offer", "Hired"]

export default function JobForm({ onSubmit, initial }) {
  const [company, setCompany] = useState(initial?.company || "")
  const [title, setTitle] = useState(initial?.title || "")
  const [status, setStatus] = useState(initial?.status || "Applied")
  const [dateApplied, setDateApplied] = useState(initial?.dateApplied ? initial.dateApplied.substring(0, 10) : "")
  const [notes, setNotes] = useState(initial?.notes || "")
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    
    if (!company?.trim()) {
      newErrors.company = "Company name is required"
    } else if (company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters"
    }
    
    if (!title?.trim()) {
      newErrors.title = "Job title is required"
    } else if (title.trim().length < 3) {
      newErrors.title = "Job title must be at least 3 characters"
    }
    
    if (dateApplied) {
      const inputDate = new Date(dateApplied)
      const today = new Date()
      if (isNaN(inputDate.getTime())) {
        newErrors.dateApplied = "Invalid date format"
      } else if (inputDate > today) {
        newErrors.dateApplied = "Date applied cannot be in the future"
      }
    }
    
    return newErrors
  }

  const handleChange = (field, value) => {
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    
    switch (field) {
      case 'company':
        setCompany(value)
        break
      case 'title':
        setTitle(value)
        break
      case 'status':
        setStatus(value)
        break
      case 'dateApplied':
        setDateApplied(value)
        break
      case 'notes':
        setNotes(value)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setSubmitting(true)
    try {
    const payload = { company, title, status, notes }
    if (dateApplied) payload.dateApplied = new Date(dateApplied).toISOString()
    await onSubmit(payload)
      
    if (!initial) {
      setCompany("")
      setTitle("")
      setStatus("Applied")
      setDateApplied("")
      setNotes("")
        setErrors({})
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <PlusIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground">
          {initial ? "Edit Application" : "Add New Application"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <BuildingOfficeIcon className="h-4 w-4 text-primary" />
              Company Name
            </label>
            <input
              type="text"
              className={`w-full bg-input border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.company ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-border'
              }`}
              value={company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g., Google, Microsoft, Apple"
              required
            />
            {errors.company && (
              <p className="text-xs text-red-600 mt-1">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <BriefcaseIcon className="h-4 w-4 text-primary" />
              Job Title
            </label>
            <input
              type="text"
              className={`w-full bg-input border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.title ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-border'
              }`}
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              required
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">{errors.title}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">Application Status</label>
            <select
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Date Applied
            </label>
            <input
              type="date"
              className={`w-full bg-input border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.dateApplied ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-border'
              }`}
              value={dateApplied}
              onChange={(e) => handleChange('dateApplied', e.target.value)}
            />
            {errors.dateApplied && (
              <p className="text-xs text-red-600 mt-1">{errors.dateApplied}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <DocumentTextIcon className="h-4 w-4 text-primary" />
              Notes
            </label>
            <input
              type="text"
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Interview feedback, follow-up notes..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <PlusIcon className="h-5 w-5" />
            {submitting ? "Saving..." : (initial ? "Update Application" : "Add Application")}
          </button>
        </div>
      </form>
    </div>
  )
}
