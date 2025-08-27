"use client"

import { useEffect, useMemo, useState } from "react"
import { getJobs, createJob, deleteJob, exportJobsAsCSV } from "../services/jobService.js"
import JobForm from "../ui/JobForm.jsx"
import JobList from "../ui/JobList.jsx"
import FilterBar from "../ui/FilterBar.jsx"
import Stats from "../ui/Stats.jsx"
import { Link } from "react-router-dom"

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [searchDate, setSearchDate] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getJobs({ q: query, status, searchDate })
      setJobs(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, status, searchDate])

  const onCreate = async (payload) => {
    await createJob(payload)
    setQuery("") // reset search
    setStatus("All") // reset filter
    setSearchDate("") // reset date filter
    await fetchData()
  }

  const onDelete = async (id) => {
    if (!confirm("Delete this job application?")) return
    await deleteJob(id)
    await fetchData()
  }

  const handleExport = () => {
    exportJobsAsCSV(jobs)
  }

  const stats = useMemo(
    () => ({
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "Applied").length,
      interview: jobs.filter((j) => j.status === "Interview").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
      offer: jobs.filter((j) => j.status === "Offer").length,
      hired: jobs.filter((j) => j.status === "Hired").length,
    }),
    [jobs]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center gap-4 justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Job Application Tracker</h1>
            <p className="text-muted-foreground mt-1">Manage and track your job applications with ease</p>
          </div>
          {/* Contact Us Link */}
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-card-foreground mb-4">Application Overview</h2>
          <Stats stats={stats} />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Add New Application */}
          <div>
            <JobForm onSubmit={onCreate} />
          </div>

          {/* Filters (moved below form) */}
          <div>
            <FilterBar 
              query={query} 
              setQuery={setQuery} 
              status={status} 
              setStatus={setStatus}
              searchDate={searchDate}
              setSearchDate={setSearchDate}
            />
          </div>
        </div>

        {/* Job Applications List */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-card-foreground">
                Your Applications
                {jobs.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({jobs.length} {jobs.length === 1 ? "application" : "applications"})
                  </span>
                )}
              </h2>
            </div>
            {jobs.length > 0 && (
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            )}
          </div>
          <JobList jobs={jobs} loading={loading} onDelete={onDelete} />
        </div>
      </div>
    </div>
  )
}
