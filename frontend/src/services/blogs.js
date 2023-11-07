import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  return window.localStorage.getItem('user-token')
}

const getAll = async () => {
  try {
    const token = getToken()
    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getBlogById = async (id) => {
  try {
    const token = getToken()
    const res = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const addNew = async (data) => {
  try {
    const token = getToken()
    const res = await axios.post(baseUrl, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default {
  getAll,
  getBlogById,
  addNew,
}
