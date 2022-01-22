import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, CreateArticlePage } from '../../pages'
import { Container } from '../style'
import { useDataContext } from '../../context/dataContext'

export default function AuthenticatedApp(): ReactElement {
  return (
    <Container>
      <AppRoutes />
    </Container>
  )
}

function AppRoutes() {
  const { articles, userArticles, tags } = useDataContext()

  return (
    <Routes>
      <Route
        path="/"
        element={<ArticlesPage articles={articles} userArticles={userArticles} tags={tags} />}
      />
      <Route path="/create-article" element={<CreateArticlePage />} />
    </Routes>
  )
}
