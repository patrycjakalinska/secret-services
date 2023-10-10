import { useEffect, useState } from 'react'
import cases from '../services/cases'
import { Box } from '@mui/material'

const Cases = () => {
  const [casesForUser, setCasesForUser] = useState([])
  const fetchCases = async () => {
    const cases_ = await cases.getAll()
    setCasesForUser(cases_)
  }

  useEffect(() => {
    fetchCases()
  }, [])

  return (
    <div>
      <Box>
        {casesForUser.map((c) => (
          <div id={c._id}>
            <h1>{c.name}</h1>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default Cases
