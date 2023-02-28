import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Msg } from 'types/chattype'
import { Button, Spacer } from '@chakra-ui/react'
import {
  List,
  ListItem,
  HStack,
  Text,
  Stack,
  VStack,
  Box,
} from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const socket = io('http://localhost:4000')
socket.on('connect', () => {
  console.log('Connected Server!')
})

const convertUnix4Date = (unix: number): Date => {
  const date: Date = new Date(unix)
  return date
}

const getChatLog = (): Msg[] => {
  const item = localStorage.getItem('log')
  if (item != null) {
    const chatLogs: Msg[] = JSON.parse(item) as Msg[]
    return chatLogs
  }
  return [] as Msg[]
}

const log = getChatLog()

const Chat: React.FC = () => {
  const [chatLogs, setChatLogs] = useState<Msg[]>(log)
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState('名無しさん')

  let msg: Msg = new Msg(sendUser)

  useEffect(() => {
    socket.on('chat', () => {
      setChatLogs(() => getChatLog())
    })
  }, [])

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsg(e.target.value)
  }

  const onChangeSenderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendUser(e.target.value)
  }

  const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    msg.Name = sendUser
    msg.Date = Date.now()
    msg.Text = chatMsg
    e.preventDefault()
    socket.emit('chat-message', msg)
    const newLog = [...chatLogs, msg]
    localStorage.setItem('log', JSON.stringify(newLog))
    setChatMsg('')
  }

  return (
    <ChakraProvider>
      <Box bg={'gray.50'} h={720}>
        <div className="chat">
          <VStack>
            <div className="chatlog">
              <List w={650} h={580} spacing={2} overflowY="scroll">
                {chatLogs.map((data, index) => {
                  return (
                    <ListItem key={index} bg={'white'} borderRadius={30} p={4}>
                      <HStack>
                        <Stack spacing={0.5}>
                          <Text fontSize="xs" color={'gray.500'}>
                            {data.Name}
                          </Text>
                          <Box fontSize="md" w={300} overflowWrap="break-word">
                            {data.Text}
                          </Box>
                        </Stack>
                        <Text fontSize="xs" color={'gray.300'}>
                          {convertUnix4Date(data.Date).toString()}
                        </Text>
                      </HStack>
                    </ListItem>
                  )
                })}
              </List>
            </div>
            <Spacer />
            <div className="msg">
              <InputGroup w={650}>
                <InputRightElement>
                  <Button
                    w={50}
                    colorScheme="teal"
                    variant="solid"
                    onClick={onClickSend}
                  >
                    Send
                  </Button>
                </InputRightElement>
                <Stack>
                  <Input
                    w={200}
                    h={45}
                    bg={'white'}
                    placeholder="名前"
                    value={sendUser}
                    onChange={onChangeSenderName}
                  />
                  <Input
                    w={650}
                    h={45}
                    bg={'white'}
                    variant="flushed"
                    placeholder="メッセージを送ろう"
                    value={chatMsg}
                    onChange={onChangeMessage}
                  />
                </Stack>
              </InputGroup>
            </div>
          </VStack>
        </div>
      </Box>
    </ChakraProvider>
  )
}

export default Chat
