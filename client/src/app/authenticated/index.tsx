import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, CreateArticlePage, ArticleDetails } from '../../pages'
import { Container } from '../style'

export default function AuthenticatedApp(): ReactElement {
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
      <Route path="/create-article" element={<CreateArticlePage />} />
      <Route path="/article/:slug" element={<ArticleDetails />} />
    </Routes>
  )
}
