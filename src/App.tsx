import React from 'react'
import { signOut } from 'firebase/auth'
import { Button, ChakraProvider, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from 'config/firebaseConfig'

const App: React.FC = () => {
  const [user] = useAuthState(auth)
  const onClickSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    try {
      await signOut(auth)
    } catch (e) {
      console.log('Failed to sign out. Please try again.')
    }
  }

  return (
    <ChakraProvider>
      <div className="header">
        <HStack>
          {!user ? (
            <Link to="/login">
              <Button variant="outline" colorScheme="teal">
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
