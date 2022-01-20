import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, CreateArticlePage } from '../../pages'
import { Container } from '../style'

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
      <Route path="/create-article" element={<CreateArticlePage />} />
    </Routes>
  )
}
