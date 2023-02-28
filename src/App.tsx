import React from 'react'
import { signOut } from '@firebase/auth'
import { Button, ChakraProvider, HStack } from '@chakra-ui/react'
import auth from 'config/firebaseConfig'
import { Link } from 'react-router-dom'

const App: React.FC = (props: any) => {
  const user = auth.currentUser

  const onClickSignOut = async () => {
    try {
      await signOut(auth)
      props.history.push('/')
    } catch (e) {
      console.log('Failed to sign out. Please try again.')
    }
  }

  const onClickLogin = () => {
    props.history.push('/login')
  }

  return (
    <ChakraProvider>
      <div className="header">
        <HStack>
          {user === null ? (
            <Link to="/login">
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={onClickLogin}
              >
                LOGIN
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onClickSignOut}
            >
              LOGOUT
            </Button>
          )}
        </HStack>
      </div>
    </ChakraProvider>
  )
}

export default App
