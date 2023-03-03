import React from 'react'
import { Spacer } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import Chat from 'components/Chat'
import App from 'App'

const RouterConf: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
      <Spacer />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterConf
