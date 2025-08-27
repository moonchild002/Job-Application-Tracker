"use client"

import { useEffect, useMemo, useState } from "react"
import { getJobs, createJob, deleteJob } from "../services/jobService.js"
import JobForm from "../ui/JobForm.jsx"
import JobList from "../ui/JobList.jsx"
import FilterBar from "../ui/FilterBar.jsx"
import Stats from "../ui/Stats.jsx"
import { BriefcaseIcon, ChartBarIcon } from "@heroicons/react/24/outline"

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getJobs({ q: query, status })
      setJobs(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, status])

  const onCreate = async (payload) => {
    await createJob(payload)
    setQuery("") // reset search
    setStatus("All") // reset filter
    await fetchData()
  }

  const onDelete = async (id) => {
    if (!confirm("Delete this job application?")) return
    await deleteJob(id)
    await fetchData()
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
    [jobs],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 gradient-primary rounded-xl">
              <BriefcaseIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-card-foreground text-balance">Job Application Tracker</h1>
              <p className="text-muted-foreground mt-1">Manage and track your job applications with ease</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ChartBarIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-card-foreground">Application Overview</h2>
          </div>
          <Stats stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Application */}
          <div className="lg:col-span-2">
            <JobForm onSubmit={onCreate} />
          </div>

          {/* Filters */}
          <div className="space-y-6">
            <FilterBar query={query} setQuery={setQuery} status={status} setStatus={setStatus} />
          </div>
        </div>

        {/* Job Applications List */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-card-foreground">
              Your Applications
              {jobs.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({jobs.length} {jobs.length === 1 ? "application" : "applications"})
                </span>
              )}
            </h2>
          </div>
          <JobList jobs={jobs} loading={loading} onDelete={onDelete} />
        </div>
      </div>
    </div>
  )
}
