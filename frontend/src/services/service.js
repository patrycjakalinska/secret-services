import axios from 'axios'
//const baseUrl = `${process.env.REACT_SITE_URL}/api/services`
const baseUrl = `https://secret-services-agh.onrender.com/api/services`

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

export default {
  getAll,
}
