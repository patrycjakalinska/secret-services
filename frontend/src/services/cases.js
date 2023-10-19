import axios from 'axios'
const baseUrl = '/api/cases'

const getToken = () => {
  return window.localStorage.getItem('user-token')
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

const addPhotos = async (data) => {
  try {
    const token = getToken()
    const res = await axios.put(
      `${baseUrl}/${data.get('caseId')}/photos`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const deletePhoto = async (caseId, photoId) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.delete(`${baseUrl}/${caseId}/${photoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return res.data
  } catch (err) {
    console.log('Error removing photo: ', err)
  }
}

const deleteCase = async (caseId) => {
  try {
    const token = getToken()

    const res = await axios.delete(`${baseUrl}/${caseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { addNew, deleteCase, addPhotos, deletePhoto }
