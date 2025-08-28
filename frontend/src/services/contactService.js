import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

console.log('Contact Service using BASE_URL:', BASE_URL)

const api = axios.create({
  baseURL: BASE_URL,
})

// Get all contacts for admin dashboard
export async function getAllContacts() {
  try {
    console.log('Fetching contacts from:', `${BASE_URL}/contacts`)
    const { data } = await api.get('/contacts')
    console.log('Contacts fetched successfully:', data)
    return data
  } catch (error) {
    console.error('Error fetching contacts:', error)
    if (error.response) {
      // Server responded with error status
      console.error('Error response:', error.response.data)
      console.error('Error status:', error.response.status)
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request)
    } else {
      // Something else happened
      console.error('Error setting up request:', error.message)
    }
    throw error
  }
}

// Get single contact by ID
export async function getContactById(id) {
  const { data } = await api.get(`/contacts/${id}`)
  return data
}

// Delete contact
export async function deleteContact(id) {
  const { data } = await api.delete(`/contacts/${id}`)
  return data
} 