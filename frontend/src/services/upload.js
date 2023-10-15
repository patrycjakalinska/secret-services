import axios from 'axios'
const baseUrl = '/api/upload'

const uploadProfilePic = async (image) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.post(baseUrl, image, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error uploading picture: ', err)
  }
}

export default { uploadProfilePic }
