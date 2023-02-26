import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import RouterConf from 'routes/index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterConf />
  </React.StrictMode>,
)
