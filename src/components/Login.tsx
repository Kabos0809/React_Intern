import React, { useState, useEffect } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Stack,
  ChakraProvider,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import auth from 'config/firebaseConfig'

const Login: React.FC = (props: any) => {
  const [isShow, setShow] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [pw, setPW] = useState<string>('')

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      user && props.history.push('/')
    })
    return () => unSub()
  }, [])

  const onClickSubmit = () => {
    if (isLogin) {
      return async () => {
        try {
          await signInWithEmailAndPassword(auth, email, pw)
          props.history.push('/')
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      return async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, pw)
          props.history.push('/')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  return (
    <ChakraProvider>
      <div className="login">
        <VStack>
          <VStack>
            <Stack>
              <Input
                name="email"
                value={email}
                type="email"
                w={500}
                h={50}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
              />
              <InputGroup w={550}>
                <Input
                  name="pw"
                  value={pw}
                  w={500}
                  h={50}
                  type={isShow ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPW(e.target.value)
                  }
                  placeholder="PassWord"
                />
                <InputRightElement>
                  <Button onClick={() => setShow(!isShow)}>
                    {isShow ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button
              variant="solid"
              colorScheme="teal"
              size="small"
              onClick={onClickSubmit}
              w={80}
              h={45}
            >
              {isLogin ? 'Login' : 'SignUp'}
            </Button>
          </VStack>
          <Button
            variant="link"
            colorScheme="teal"
            color="black"
            onClick={() => {
              setIsLogin(!isLogin)
            }}
          >
            {isLogin ? 'アカウントをお持ちでない方' : 'アカウントをお持ちの方'}
          </Button>
        </VStack>
      </div>
    </ChakraProvider>
  )
}

export default Login
