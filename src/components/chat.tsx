import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField } from '@mui/material'
import { Auth, getAuth } from '@firebase/auth'
import { Msg, ChatLog } from 'types/chattype'

const ConvertDate4Unix = (date: Date): number => {
  const unix: number = Math.round(date.getTime() / 1000)
  return unix
}

const ConvertUnix4Date = (unix: number): Date => {
  const date: Date = new Date(unix * 1000)
  return date
}

const AddMsg4NewLog = (msg: Msg) => {
  try {
    let newLog: ChatLog = {
      chats: [msg],
    }
    localStorage.setItem('ChatLog', JSON.stringify(newLog))
  } catch (e) {
    console.log(e)
  }
}

const AddMsg = (logs: ChatLog, msg: Msg) => {
  try {
    logs.chats.push(msg)
    localStorage.setItem('ChatLog', JSON.stringify(logs))
  } catch (e) {
    console.log(e)
  }
}

export const Chat: React.FC = (props: any) => {
  const today: Date = new Date()
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState('名無しさん')

  useEffect(() => {
    const
  })

  return (
    <div className="Msg">
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
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="senduser"
          label="送信者"
          value={sendUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSendUser(e.target.value)
          }
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={async () => {
          try {
            const msg: Msg = {
              text: chatMsg,
              send_user: sendUser,
              sended_at: ConvertDate4Unix(today),
            }
            let logs: ChatLog = JSON.parse(
              localStorage.getItem('ChatLog') as string,
            ) as ChatLog
            logs == null ? await AddMsg4NewLog(msg) : await AddMsg(logs, msg)
            props.history.push('/chat')
          } catch (e) {
            console.log(e)
          }
        }}
      />
    </div>
  )
}

export const PastChats: React.FC = () => {
  const chat: ChatLog = JSON.parse(
    localStorage.getItem('ChatLog') as string,
  ) as ChatLog
  return <div className="PastChats"></div>
}
