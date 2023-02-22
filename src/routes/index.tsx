import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import App from 'App'

export const RouterConf: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}