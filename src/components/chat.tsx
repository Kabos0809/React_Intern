import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField } from '@mui/material'
import { getAuth } from 'firebase/auth'

const Chat: React.FC = () => {
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState('')

  return (
    <div className="Chat">
      <FormControl></FormControl>
    </div>
  )
}

export default Chat
