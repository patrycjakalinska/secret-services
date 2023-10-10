import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Cases = ({ cases }) => {
  return (
    <div>
      <Box>
        <div>
          <Button>
            <Link to="/newcase">Create new case</Link>
          </Button>
        </div>
        {cases.map((c) => (
          <div id={c._id}>
            <h1>
              <Link to={`/cases/${c._id}`}>{c.name}</Link>
            </h1>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default Cases
