import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField } from '@mui/material'
import { getAuth } from 'firebase/auth'

const ConvertDate4Unix = (date: Date): number => {
  const unix: number = Math.round(date.getTime() / 1000)
  return unix
}

const ConvertUnix4Date = (unix: number): Date => {
  const date: Date = new Date(unix * 1000)
  return date
}

export const Chat: React.FC = (props: any) => {
  const today: Date = new Date()
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
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={async () => {
          const msg: Chat = {
            text: chatMsg,
            sended_at: ConvertDate4Unix(today),
          }
        }}
      />
    </div>
  )
}

export const PastChats: React.FC = (props: any) => {
  const PastChat: ChatLog = {
    chats: localStorage.getItem('ChatLog'),
  }
}
