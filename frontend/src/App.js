import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import FullpageWrapper from './components/FullpageWrapper'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm.js'
import Cases from './components/Cases'
import Case from './components/Case'
import CaseForm from './components/CaseForm'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import cases from './services/cases'
import users from '../src/services/users'

function App() {
  const [token, setToken] = useState(false)
  const [user, setUser] = useState({})
  const [casesForUser, setCasesForUser] = useState([])
  const [error, setError] = useState('')

  const fullpageApiRef = useRef(null)

  useEffect(() => {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      setToken(true)
    } else {
      setToken(false)
      setCasesForUser([])
      setUser({})
    }
  }, [])

  useEffect(() => {
    if (token && Object.keys(user).length === 0) {
      users
        .getUserInfo()
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [token, user])

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const fetchedCases = await cases.getAll()
        setCasesForUser(fetchedCases)
      } catch (err) {
        console.log('Error fetching cases.')
      }
    }
    if (token) {
      fetchCases()
    }
  }, [token])

  return (
    <Router>
      <div
        style={{ backgroundColor: '#F1F0F0', color: '#313131', height: '120%' }}
      >
        <Navbar fullpageApi={fullpageApiRef} user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={<FullpageWrapper fullpageApi={fullpageApiRef} />}
          />
          <Route
            path="/login"
            element={
              token ? <Navigate to="/" /> : <LoginForm setIsLogged={setToken} />
            }
          />
          <Route
            path="/register"
            element={
              token ? (
                <Navigate to="/" />
              ) : (
                <RegisterForm setIsLogged={setToken} />
              )
            }
          />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/cases" element={<Cases cases={casesForUser} />} />
            <Route
              path="/cases/:id"
              element={
                <Case
                  casesForUser={casesForUser}
                  updateCases={setCasesForUser}
                />
              }
            />
            <Route
              path="/newcase"
              element={<CaseForm updateCases={setCasesForUser} />}
            />
            <Route path="/account" element={<Account user={user} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
