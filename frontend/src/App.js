import FullpageWrapper from './components/FullpageWrapper'
import Navbar from './components/Navbar'

import './styles/styles.css'

function App() {
  return (
    <div style={{ backgroundColor: '#F1F0F0', color: '#313131', height:'140%' }}>
      <Navbar />
      <FullpageWrapper />
    </div>
  )
}

export default App
