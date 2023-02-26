import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Msg } from 'types/chattype'
import { Button, FormErrorMessage } from '@chakra-ui/react'
import {
  List,
  ListItem,
  HStack,
  Text,
  Stack,
  VStack,
  Box,
} from '@chakra-ui/layout'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { ArrowUpIcon } from '@chakra-ui/icons'

const socket = io('http://localhost:3000')
socket.on('connect', () => {
  console.log('Connected Server!')
})

const convertDate4Unix = (date: Date): number => {
  const unix: number = Math.round(date.getTime() / 1000)
  return unix
}

const convertUnix4Date = (unix: number): Date => {
  const date: Date = new Date(unix * 1000)
  return date
}

const getSenderName = (): string => {
  const name = localStorage.getItem('sender_name')
  if (name != null) {
    return name
  }
  return '名無しさん'
}

const getChatLog = (): Msg[] => {
  const item = localStorage.getItem('chat_log')
  if (item != null) {
    const chatLogs: Msg[] = JSON.parse(item) as Msg[]
    return chatLogs
  }
  return [] as Msg[]
}

const Chat: React.FC = () => {
  const name: string = getSenderName()
  let msg: Msg = new Msg(name)
  const [isLoading, setIsLoading] = useState(false)
  const [chatLogs, setChatLogs] = useState<Msg[]>(getChatLog())
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState(msg.Name)

  const isError = chatMsg === ''

  useEffect(() => {
    socket.on('chat', (msg) => {
      setIsLoading(!isLoading)
      setChatLogs((chatLogs) => [...chatLogs, msg])
      localStorage.setItem('chat_log', JSON.stringify(chatLogs))
    })
  }, [])

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsg(e.target.value)
  }

  const onChangeSenderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendUser(e.target.value)
  }

  const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(!isLoading)
    msg.Name = sendUser
    msg.Date = convertDate4Unix(new Date())
    msg.Text = chatMsg
    e.preventDefault()
    socket.emit('chat-message', msg)
    setChatMsg('')
  }

  return (
    <div className="chat">
      <VStack>
        <div className="chatlog">
          <List w={600} spacing={2}>
            {chatLogs.map((data, index) => {
              const date = convertUnix4Date(data.Date)
              return (
                <ListItem key={index}>
                  <HStack>
                    <Stack>
                      <Text fontSize="xs">{data.Name}</Text>
                      <Box
                        fontSize="md"
                        w={250}
                        overflowWrap="break-word"
                        bg="white"
                      >
                        {data.Text}
                      </Box>
                    </Stack>
                    <Text fontSize="xs">{date.toString()}</Text>
                  </HStack>
                </ListItem>
              )
            })}
          </List>
        </div>
        <div className="msg">
          <InputGroup>
            <InputRightElement>
              <Button
                isLoading={isLoading}
                loadingText="Submitting"
                colorScheme="teal"
                variant="outline"
                onClick={onClickSend}
              >
                <ArrowUpIcon />
              </Button>
            </InputRightElement>
            <Stack>
              <Input
                w={200}
                h={45}
                placeholder="名前"
                value={sendUser}
                onChange={onChangeSenderName}
              />
              <Input
                w={600}
                h={45}
                placeholder="メッセージを送ろう"
                value={chatMsg}
                onChange={onChangeMessage}
              />
              {isError ? (
                <></>
              ) : (
                <FormErrorMessage>
                  メッセージを入力してください
                </FormErrorMessage>
              )}
            </Stack>
          </InputGroup>
        </div>
      </VStack>
    </div>
  )
}

export default Chat
