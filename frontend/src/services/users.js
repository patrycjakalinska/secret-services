import axios from 'axios'
const baseUrl = '/api/users'

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
    console.log('USERS')
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log('Error fetching user info: ', err)
    throw err
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { register, getUserInfo }
