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

const uploadCasePhotos = async (images) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.post(`${baseUrl}/many`, images, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error uploading pictures: ', err)
  }
}

const deletePhoto = async (id, caseId) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.delete(`${baseUrl}/${caseId}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return res.data
  } catch (err) {
    console.log('Error removing photo: ', err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { uploadProfilePic, uploadCasePhotos, deletePhoto }
