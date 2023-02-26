import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Auth, getAuth } from '@firebase/auth'
import { Msg, ChatLog } from 'types/chattype'

const socket = io('http://localhost:3000')
socket.on('connect', () => {
  console.log(socket.connect())
})

const convertDate4Unix = (date: Date): number => {
  const unix: number = Math.round(date.getTime() / 1000)
  return unix
}

const convertUnix4Date = (unix: number): Date => {
  const date: Date = new Date(unix * 1000)
  return date
}

export const Chat: React.FC = (props: any) => {
  const today: Date = new Date()
  const [chatLogs, setChatLogs] = useState<Msg[]>([])
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState('名無しさん')

  useEffect(() => {
    socket.on('chat', (msg) => {
      setChatLogs()
    })
  })

  const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    socket.emit('chat-message', msg)
  }

  return <div className="Msg"></div>
}
