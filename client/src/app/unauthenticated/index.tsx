import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, SignUpPage, SignInPage } from '../../pages'
import { Container } from './style'

export default function UnauthenticatedApp(): ReactElement {
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
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}
