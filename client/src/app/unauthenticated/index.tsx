import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, SignUpPage, SignInPage } from '../../pages'
import { Container } from './style'
import { useDataContext } from '../../context/dataContext'

export default function UnauthenticatedApp(): ReactElement {
  return (
    <Container>
      <AppRoutes />
    </Container>
  )
}

function AppRoutes() {
  const { articles, tags } = useDataContext()

  return (
    <Routes>
      <Route path="/" element={<ArticlesPage articles={articles} tags={tags} />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}
