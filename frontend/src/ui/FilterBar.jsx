"use client"

import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"

const statusOptions = ["All", "Applied", "Interview", "Rejected", "Offer", "Hired"]

export default function FilterBar({ query, setQuery, status, setStatus }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
      {/* Search by Company */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <MagnifyingGlassIcon className="h-4 w-4 text-primary" />
          Search Companies
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="Search by company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Filter by Status */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <FunnelIcon className="h-4 w-4 text-primary" />
          Filter by Status
        </label>
        <select
          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <div className="flex items-end">
        <button
          onClick={() => {
            setQuery("")
            setStatus("All")
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted border border-border text-muted-foreground rounded-lg hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-200 font-semibold"
        >
          <XMarkIcon className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  )
}
