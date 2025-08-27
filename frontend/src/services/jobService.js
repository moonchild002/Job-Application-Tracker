import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: BASE_URL,
})

export async function getJobs({ q = '', status = 'All', searchDate } = {}) {
  const params = {}
  if (q) params.q = q
  if (status) params.status = status
  if (searchDate) params.searchDate = searchDate
  const { data } = await api.get('/jobs', { params })
  return data
}

export async function getJobById(id) {
  const { data } = await api.get(`/jobs/${id}`)
  return data
}

export async function createJob(payload) {
  const { data } = await api.post('/jobs', payload)
  return data
}

export async function updateJob(id, payload) {
  const { data } = await api.put(`/jobs/${id}`, payload)
  return data
}

export async function deleteJob(id) {
  const { data } = await api.delete(`/jobs/${id}`)
  return data
}

// New: submit contact form
export async function submitContact(payload) {
  const { data } = await api.post('/contact', payload)
  return data
}

// New: export jobs as CSV
export function exportJobsAsCSV(jobs) {
  if (!jobs || jobs.length === 0) {
    alert('No jobs to export')
    return
  }

  // Define CSV headers
  const headers = [
    'Company',
    'Job Title', 
    'Status',
    'Date Applied',
    'Notes',
    'Created At'
  ]

  // Convert jobs to CSV rows
  const csvRows = jobs.map(job => [
    `"${job.company || ''}"`,
    `"${job.title || ''}"`,
    `"${job.status || ''}"`,
    `"${job.dateApplied ? new Date(job.dateApplied).toLocaleDateString() : ''}"`,
    `"${job.notes || ''}"`,
    `"${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}"`
  ])

  // Combine headers and rows
  const csvContent = [headers, ...csvRows]
    .map(row => row.join(','))
    .join('\n')

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}