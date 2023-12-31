import axios from 'axios'
//const baseUrl = `${process.env.REACT_SITE_URL}/api/login`
const baseUrl = `https://secret-services-agh.onrender.com/api/login`

const login = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (err) {
    console.log('Something went wrong.')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
