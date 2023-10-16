import axios from 'axios'
const baseUrl = '/api/cases'

const getToken = () => {
  return window.localStorage.getItem('user-token')
}

const getAll = async () => {
  try {
    const token = getToken()

    if (!token) {
      return 'Empty'
      // TODO:
      // redirect to main
    }

    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    throw err
  }
}

const addNew = async (caseDetails) => {
  try {
    const token = getToken()
    const res = await axios.post(baseUrl, caseDetails, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const addPhotos = async (photos, caseId) => {
  try {
    const token = getToken()
    console.log('Photos: ', photos)
    console.log(caseId)
    const res = await axios.put(`${baseUrl}/${caseId}/addPhotos`, photos, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
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
export default { getAll, addNew, deleteCase, addPhotos }
