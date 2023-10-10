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

    console.log(caseDetails)
    const res = await axios.post(baseUrl, caseDetails, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNew }
