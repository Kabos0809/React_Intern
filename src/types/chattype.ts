export type Msg = {
  send_user: string
  text: string
  sended_at: number
}

export type ChatLog = {
  chats: Msg[]
}
