import React, { useEffect, useState } from 'react'
import { signOut, User } from '@firebase/auth'
import { Button, ChakraProvider, HStack } from '@chakra-ui/react'
import { onAuthStateChanged } from '@firebase/auth'
import auth from 'config/firebaseConfig'

const App: React.FC = () => {
  const [user, setUesr] = useState<User | null>(auth.currentUser)
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

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, () => {
      setUesr(auth.currentUser)
    })
    return () => unSub()
  }, [])

  return (
    <ChakraProvider>
      <div className="header">
        <HStack>
          {user === null ? (
            <></>
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
