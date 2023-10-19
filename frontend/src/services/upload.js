// TODO:
// export getToken somewhere
import axios from 'axios'
const baseUrl = '/api/upload'

const uploadProfilePic = async (image) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.post(`${baseUrl}/profilePic`, image, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error uploading picture: ', err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { uploadProfilePic }
