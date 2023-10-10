import axios from 'axios'
const baseUrl = '/api/cases'

const getAll = async () => {
  try {
    const token = window.localStorage.getItem('user-token')

    if (!token) {
      return {}
      // TODO:
      // redirect to main
    }

    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })

  } catch (err) {
    throw err
  }
}
