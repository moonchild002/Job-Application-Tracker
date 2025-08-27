"use client"

import { Link } from "react-router-dom"
import { PencilIcon, TrashIcon, BuildingOfficeIcon, CalendarIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

const badgeColors = {
  Applied: "bg-blue-100 text-blue-800 border-blue-200",
  Interview: "bg-amber-100 text-amber-800 border-amber-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
  Offer: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Hired: "bg-green-100 text-green-800 border-green-200",
}

const statusIcons = {
  Applied: "📝",
  Interview: "🎯",
  Rejected: "❌",
  Offer: "🎉",
  Hired: "✅",
}

export default function JobCard({ job, onDelete }) {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BuildingOfficeIcon className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                {job.company}
              </h3>
            </div>
            <p className="text-muted-foreground font-medium">{job.title}</p>
          </div>

          <div className="text-2xl">{statusIcons[job.status]}</div>
        </div>

        {/* Status and Date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${badgeColors[job.status]}`}>
            {job.status}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3" />
            {new Date(job.dateApplied || job.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Notes */}
        {job.notes && (
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground italic line-clamp-2">{job.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link
            to={`/edit/${job._id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 font-medium"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 font-medium"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
