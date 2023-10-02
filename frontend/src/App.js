import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FullpageWrapper from './components/FullpageWrapper'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm.js'

function App() {
  const [token, setToken] = useState(false)

  const fullpageApiRef = useRef(null)

  useEffect(() => {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      setToken(true)
    } else {
      setToken(false)
    }
  }, [])

  return (
    <Router>
      <div
        style={{ backgroundColor: '#F1F0F0', color: '#313131', height: '140%' }}
      >
        <Navbar
          isLogged={token}
          fullpageApi={fullpageApiRef}
          setIsLogged={setToken}
        />
        <Routes>
          <Route
            path="/"
            element={<FullpageWrapper fullpageApi={fullpageApiRef} />}
          />
          <Route path="/login" element={<LoginForm setIsLogged={setToken} />} />
          <Route
            path="/register"
            element={<RegisterForm setIsLogged={setToken} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
