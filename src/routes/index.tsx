import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import Chat from 'components/Chat'

const RouterConf: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterConf
