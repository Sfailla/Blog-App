import { ReactElement } from 'react'
import { Container } from './style'
import { Navbar } from '../components'
import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'
import { useAuthContext } from '../context/auth-context'

export default function App(): ReactElement {
  const { user } = useAuthContext()
  return (
    <Container>
      <Navbar />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  )
}
