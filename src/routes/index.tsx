import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import App from 'App'

const RouterConf: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterConf
