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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { company, title, status, notes }
    if (dateApplied) payload.dateApplied = new Date(dateApplied).toISOString()
    await onSubmit(payload)
    if (!initial) {
      setCompany("")
      setTitle("")
      setStatus("Applied")
      setDateApplied("")
      setNotes("")
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
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft, Apple"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
              <BriefcaseIcon className="h-4 w-4 text-primary" />
              Job Title
            </label>
            <input
              type="text"
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">Application Status</label>
            <select
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
            />
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
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interview feedback, follow-up notes..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            {initial ? "Update Application" : "Add Application"}
          </button>
        </div>
      </form>
    </div>
  )
}
