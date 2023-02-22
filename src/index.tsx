import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterConf } from 'routes/index'

ReactDOM.render(
  <React.StrictMode>
    <RouterConf />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
