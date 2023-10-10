import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Case = ({ cases }) => {
  const id = useParams().id
  console.log(id)
  console.log(cases)
  const currentCase = cases.find((c) => c._id === id)

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
      <h1>{currentCase.name}</h1>
      <h2>{currentCase.interest}</h2>
      <h3>{currentCase.description}</h3>
    </div>
  )
}

export default Case
