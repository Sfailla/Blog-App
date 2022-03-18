import { ReactElement } from 'react'
import { Container } from './style'
import { Navbar } from '../components'
import { useAuthContext } from '../context/authContext'

import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

export default function App(): ReactElement {
  const { user } = useAuthContext()

  return (
    <Container>
      <Navbar />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  )
}
