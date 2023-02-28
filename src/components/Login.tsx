import React, { useState, useEffect } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Stack,
  ChakraBaseProvider,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
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

  return (
    <ChakraBaseProvider>
      <div className="login">
        <Stack>
          <VStack>
            <Stack>
              <Input
                name="email"
                value={email}
                type="email"
                w={450}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
              />
              <InputGroup w={550}>
                <Input
                  name="pw"
                  value={pw}
                  w={450}
                  type={isShow ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPW(e.target.value)
                  }
                  placeholder="PassWord"
                />
                <InputRightElement>
                  <Button
                    rightIcon={<ViewIcon />}
                    onClick={() => setShow(!isShow)}
                  >
                    {isShow ? 'unvisible' : 'show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInWithEmailAndPassword(auth, email, pw)
                        props.history.push('/')
                      } catch (e) {
                        console.log(e)
                      }
                    }
                  : async () => {
                      try {
                        await createUserWithEmailAndPassword(auth, email, pw)
                        props.history.push('/')
                      } catch (e) {
                        console.log(e)
                      }
                    }
              }
            >
              {isLogin ? 'Login' : 'SignUp'}
            </Button>
          </VStack>
          <Button
            colorScheme="teal"
            onClick={() => {
              setIsLogin(!isLogin)
            }}
          >
            {isLogin ? 'アカウントをお持ちでない方' : 'アカウントをお持ちの方'}
          </Button>
        </Stack>
      </div>
    </ChakraBaseProvider>
  )
}

export default Login
