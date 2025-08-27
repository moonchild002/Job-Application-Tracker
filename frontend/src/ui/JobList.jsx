import JobCard from "./JobCard.jsx"
import { BriefcaseIcon } from "@heroicons/react/24/outline"

export default function JobList({ jobs, loading, onDelete }) {
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground font-medium">Loading your applications...</p>
      </div>
    )

  if (jobs.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="p-4 bg-muted/50 rounded-full">
          <BriefcaseIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-card-foreground">No applications yet</h3>
          <p className="text-muted-foreground">Start tracking your job applications by adding your first one above!</p>
        </div>
      </div>
    )

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onDelete={() => onDelete(job._id)} />
      ))}
    </div>
  )
}
