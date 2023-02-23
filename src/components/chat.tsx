import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField } from '@mui/material'

const Chat: React.FC = (props: any) => {
  const [chatMsg, setChatMsg] = useState('')

  return (
    <div className="Chat">
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="message"
          label="メッセージ"
          value={chatMsg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChatMsg(e.target.value)
          }
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" color="primary" />
      </FormControl>
    </div>
  )
}

export default Chat
