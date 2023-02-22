import auth from 'firebase/auth'

type Chat = {
  name: string
  send_user: string
  dst_user: string
  text: string
  sended_at: number
}

type ChatRoom = {
  user: string[]
  chats: Chat[]
}
