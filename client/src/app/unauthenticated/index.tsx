import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, ArticleDetails, SignUpPage, SignInPage } from '../../pages'
import { Container } from './style'

export default function UnauthenticatedApp(): ReactElement {
  return (
    <Container>
      <AppRoutes />
    </Container>
  )
}

function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/article/:slug" element={<ArticleDetails />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="*" element={<ArticlesPage />} />
    </Routes>
  )
}
