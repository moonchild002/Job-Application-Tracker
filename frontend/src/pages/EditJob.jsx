"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getJobById, updateJob } from "../services/jobService.js"
import JobForm from "../ui/JobForm.jsx"
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline"

export default function EditJob() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState(null)

  useEffect(() => {
    ;(async () => {
      const job = await getJobById(id)
      setInitial(job)
    })()
  }, [id])

  const onSubmit = async (payload) => {
    await updateJob(id, payload)
    navigate("/")
  }

  if (!initial) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground font-medium">Loading application details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <PencilIcon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground text-balance">Edit Application</h1>
                <p className="text-muted-foreground">
                  {initial.company} — {initial.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <JobForm onSubmit={onSubmit} initial={initial} />
      </div>
    </div>
  )
}
