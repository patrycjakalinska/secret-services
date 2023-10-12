import axios from 'axios'
const baseUrl = '/api/users'

const getToken = () => {
  return window.localStorage.getItem('user-token')
}

const register = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getUserInfo = async () => {
  try {
    const token = window.localStorage.getItem('user-token')

    if (!token) {
      return {}
    }
    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error fetching user info: ', err)
    throw err
  }
}

const uploadProfilePic = async (image) => {
  try {
    const token = getToken()
    const res = await axios.post(`${baseUrl}/upload`, image, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error uploading picture: ', err)
  }
}

const updateUser = async (details) => {
  try {
    const token = getToken()
    const res = await axios.put(baseUrl, details, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    console.log('Error updating user info: ', err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { register, getUserInfo, uploadProfilePic, updateUser }
