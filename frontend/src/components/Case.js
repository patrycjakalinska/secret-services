import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import cases from '../services/cases'

const Case = ({ casesForUser, updateCases }) => {
  const navigate = useNavigate()

  const id = useParams().id
  const currentCase = casesForUser.find((c) => c._id === id)

  const handleDelete = async () => {
    const deletedCase = await cases.deleteCase(id)
    const updatedCases = casesForUser.filter((c) => c._id !== id)
    updateCases(updateCases)
    navigate('/cases')
  }

  // TODO:
  // * better loading screen
  if (!currentCase) {
    return <div>Loading...</div>
  }

  console.log(currentCase)
  return (
    <div>
      <h1>
        <Link to={'/cases'}>ALL</Link>
      </h1>
      <Button onClick={handleDelete}>Delete</Button>
      <h1>{currentCase.name}</h1>
      <h2>{currentCase.interest}</h2>
      <h3>{currentCase.description}</h3>
    </div>
  )
}

export default Case
