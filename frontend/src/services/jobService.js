import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
})

export async function getJobs({ q = '', status = 'All' } = {}) {
  const params = {}
  if (q) params.q = q
  if (status) params.status = status
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