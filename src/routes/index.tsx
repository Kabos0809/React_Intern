import React, { useEffect, useState } from 'react'
import { Spacer } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import Chat from 'components/Chat'
import App from 'App'
import { onAuthStateChanged, User } from '@firebase/auth'
import auth from 'config/firebaseConfig'

const RouterConf: React.FC = () => {
  const [user, setUesr] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    const onSub = onAuthStateChanged(auth, () => {
      setUesr(auth.currentUser)
    })
    return () => onSub()
  }, [])

  return (
    <BrowserRouter>
      <App />
      <Spacer />
      <Routes>
        {user !== null ? (
          <Route path="/" element={<Chat />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default RouterConf
