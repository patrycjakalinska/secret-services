import axios from 'axios'
const baseUrl = '/api/users'

const register = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    console.log(res)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { register }
