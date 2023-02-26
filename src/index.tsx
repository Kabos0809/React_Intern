import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import RouterConf from 'routes/index'
import Chat from 'components/Chat'

ReactDOM.render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>,
  document.getElementById('root'),
)
