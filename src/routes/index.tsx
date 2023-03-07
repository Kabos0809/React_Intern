import React from 'react'
import { Spacer } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from 'config/firebaseConfig'

import Login from 'components/Login'
import Chat from 'components/Chat'
import App from 'App'

const RouterConf: React.FC = () => {
  const [user] = useAuthState(auth)
  return (
    <ChakraProvider>
      <BrowserRouter>
        <App />
        <Spacer />
        <Routes>
          {user ? (
            <Route path="/" element={<Chat />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default RouterConf
