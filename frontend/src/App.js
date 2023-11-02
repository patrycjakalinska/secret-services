import { useEffect, useRef, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import FullpageWrapper from './components/FullpageWrapper'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm.js'
import Cases from './components/Cases'
import Case from './components/Case'
import CaseForm from './components/CaseForm'
import AllEvidence from './components/AllEvidence'
import Evidence from './components/Evidence'
import Account from './components/Account'
import ProtectedRoute from './components/misc/ProtectedRoute'
import users from '../src/services/users'
import cases from './services/cases'
import ChatBot from './components/ChatBot'
import 'react-chatbot-kit/build/main.css'

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
      //setUser({})
    }
  }, [])

  useEffect(() => {
    if (token && Object.keys(user).length === 0) {
      users
        .getUserInfo()
        .then((data) => {
          setUser({
            name: data.name,
            surname: data.surname,
            mail: data.mail,
            userType: data.userType,
            bookmarks: data.bookmarks,
            number: data.number,
            gender: data.gender,
            profilePicture: {
              url: data.profilePicture.url,
              profileId: data.profilePicture.profileId,
              tags: data.tags,
            },
            id: data.id,
          })
        })
        .catch((err) => {
          console.log(err)
        })
      cases.getAll().then((data) => {
        setCasesForUser(data)
      })
    }
  }, [token, user])

  const handleLogout = () => {
    window.localStorage.removeItem('user-token')
    setUser({})
    setToken(false)
    setCasesForUser([])
  }

  return (
    <div
      style={{
        backgroundColor: '#F1F0F0',
        color: '#313131',
        height: '120%',
      }}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <ChatBot user={user} />
      </Box>
      <Routes>
        <Route
          path="/"
          element={<FullpageWrapper  />}
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
        <Route element={<ProtectedRoute isUser={token} />}>
          <Route
            path="/cases"
            element={<Cases cases={casesForUser} user={user} />}
          />
          <Route
            path="/cases/:id"
            element={
              <Case
                casesForUser={casesForUser}
                updateCases={setCasesForUser}
                user={user}
              />
            }
          />
          <Route
            path="/cases/:id/evidence"
            element={<AllEvidence casesForUser={casesForUser} />}
          />
          <Route
            path="/cases/:id/evidence/:evidenceId"
            element={
              <Evidence
                casesForUser={casesForUser}
                user={user}
                updateCases={setCasesForUser}
              />
            }
          />
          <Route
            path="/newcase"
            element={<CaseForm updateCases={setCasesForUser} />}
          />
          <Route
            path="/user/:id"
            element={
              <Account user={user} updateUserInfo={setUser} formType="main" />
            }
          />

          <Route
            path="/user/:id/info"
            element={
              <Account
                user={user}
                updateUserInfo={setUser}
                formType="profile"
              />
            }
          />
          <Route
            path="/user/:id/payments"
            element={
              <Account user={user} updateUser={setUser} formType="payment" />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
