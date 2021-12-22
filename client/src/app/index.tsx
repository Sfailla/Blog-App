import { ReactElement } from 'react'
import { Container } from './style'
import { Navbar } from '../components'
import { useAuth } from '../context/useAuth'
import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

export default function App(): ReactElement {
  const { user } = useAuth()
  return (
    <Container>
      <Navbar />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  )
}
