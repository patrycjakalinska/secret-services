import axios from 'axios'
//const baseUrl = `${process.env.REACT_SITE_URL}/api/cases`
const baseUrl = `https://secret-services-agh.onrender.com/api/cases`

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

const getCaseById = async (id) => {
  try {
    const token = getToken()
    const res = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
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

const getEvidenceForCase = async (caseId) => {
  try {
    const token = window.localStorage.getItem('user-token')

    const res = await axios.get(`${baseUrl}/${caseId}/evidence`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return res.data
  } catch (err) {
    console.log('Error fetching evidence: ', err)
  }
}

const addEvidence = async (data, id) => {
  try {
    const token = getToken()

    const res = await axios.post(`${baseUrl}/${id}/evidence`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error adding evidence: ', err)
  }
}

const deleteEvidence = async (id, evidenceId) => {
  try {
    const token = getToken()
    console.log(id)

    const res = await axios.delete(`${baseUrl}/${id}/evidence/${evidenceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log('Error deleting evidence: ', err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getCaseById,
  addNew,
  deleteCase,
  addPhotos,
  deletePhoto,
  getEvidenceForCase,
  addEvidence,
  deleteEvidence,
}
