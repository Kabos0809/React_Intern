import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Msg } from 'types/chattype'
import { Button, FormErrorMessage } from '@chakra-ui/react'
import { List, ListItem, HStack, Text, Stack, VStack } from '@chakra-ui/layout'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { ArrowUpIcon, SmallCloseIcon } from '@chakra-ui/icons'

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

const senderName = (): string => {
  const name = localStorage.getItem('sender_name')
  name != null
    ? () => {
        return name
      }
    : () => {
        return '名無しさん'
      }
  return '名無しさん'
}

const Chat: React.FC = (props: any) => {
  const name: string = senderName()
  let msg: Msg = new Msg(name)
  const [chatLogs, setChatLogs] = useState<Msg[]>([])
  const [chatMsg, setChatMsg] = useState('')
  const [sendUser, setSendUser] = useState(msg.Name)

  const isError = chatMsg === ''

  useEffect(() => {
    socket.on('chat', (msg) => {
      setChatLogs((chatLogs) => [...chatLogs, msg])
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
          <List w={600}>
            {chatLogs.map((data, index) => {
              const date = convertUnix4Date(data.Date)
              return (
                <ListItem key={index}>
                  <HStack>
                    <Stack>
                      <Text fontSize="xs">{data.Name}</Text>
                      <Text fontSize="md" w={250} overflowWrap="break-word">
                        {data.Text}
                      </Text>
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
              {!isError ? (
                <Button
                  isLoading
                  loadingText="Submitting"
                  colorScheme="teal"
                  variant="outline"
                  onClick={onClickSend}
                >
                  <ArrowUpIcon />
                </Button>
              ) : (
                <SmallCloseIcon />
              )}
            </InputRightElement>
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
              <FormErrorMessage>メッセージを入力してください</FormErrorMessage>
            )}
          </InputGroup>
        </div>
      </VStack>
    </div>
  )
}

export default Chat
