import React, { useState } from 'react'
import { signOut } from '@firebase/auth'
import { Button, ChakraProvider, HStack } from '@chakra-ui/react'
import auth from 'config/firebaseConfig'
import { Link } from 'react-router-dom'

const App: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser)
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
          {user === null ? (
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
