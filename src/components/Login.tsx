import React, { useState, useEffect } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Stack,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { auth } from 'config/firebaseConfig'

const Login: React.FC = (props: any) => {
  const [isShow, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPW] = useState('')

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push('/')
    })
    return () => unSub()
  }, [props.history])

  return (
    <div className="login">
      <Stack>
        <VStack>
          <Input
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
          />
          <InputGroup>
            <Input
              name="pw"
              value={pw}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPW(e.target.value)
              }
              placeholder="PassWord"
            />
            <InputRightElement>
              <Button rightIcon={<ViewIcon />} onClick={() => setShow(!isShow)}>
                Show
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={
              isLogin
                ? async () => {
                    try {
                      await auth.signInWithEmailAndPassword(email, pw)
                      props.history.push('/')
                    } catch (e) {
                      console.log(e)
                    }
                  }
                : async () => {
                    try {
                      await auth.createUserWithEmailAndPassword(email, pw)
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
          onClick={() => {
            setIsLogin(!isLogin)
          }}
        >
          {isLogin ? 'SignUP' : 'Login'}
        </Button>
      </Stack>
    </div>
  )
}

export default Login
