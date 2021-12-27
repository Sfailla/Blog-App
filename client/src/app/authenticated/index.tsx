import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage } from '../../pages'
import { Container } from '../style'

// interface Props {}

export default function AuthenticatedApp(): ReactElement {
  return (
    <Container>
      <AppRoutes />
    </Container>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
    </Routes>
  )
}
