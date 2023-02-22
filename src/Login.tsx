import React, { useState, useEffect } from 'react'
import { Button, FormControl, TextField, Typography } from '@mui/material'
import { auth } from './firebaseConfig'

const Login: React.FC = (props: any) => {
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
    <div>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="メールアドレス"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormControl>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="pw"
          label="パスワード"
          value={pw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPW(e.target.value)
          }
        />
      </FormControl>
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
      <Typography>
        <button
          onClick={() => {
            setIsLogin(!isLogin)
          }}
        >
          {isLogin ? 'SignUP' : 'Login'}
        </button>
      </Typography>
    </div>
  )
}

export default Login
