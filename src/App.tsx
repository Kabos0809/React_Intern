import React from 'react'
import { signOut } from '@firebase/auth'
import { Button, ChakraProvider, HStack } from '@chakra-ui/react'
import auth from 'config/firebaseConfig'

const App: React.FC = () => {
  const user = auth.currentUser

  const onClickSignOut = async () => {
    try {
      await signOut(auth)
    } catch (e) {
      console.log('Failed to sign out. Please try again.')
    }
  }

  return (
    <ChakraProvider>
      <head>
        <div className="header">
          <HStack>
            {user === null ? (
              <Button variant="outline" colorScheme="teal">
                LOGIN
              </Button>
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
      </head>
    </ChakraProvider>
  )
}

export default App
