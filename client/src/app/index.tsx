import { ReactElement } from 'react'
import { Container } from './style'
import { Navbar } from '../components'
import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

const user = null

export default function App(): ReactElement {
  return (
    <Container>
      <Navbar />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  )
}
