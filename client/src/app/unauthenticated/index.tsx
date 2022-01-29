import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, SignUpPage, SignInPage } from '../../pages'
import { Container } from './style'
import { Article, Tag } from '../../types/shared'

interface Props {
  articles: Article[]
  tags: Tag[]
}

export default function UnauthenticatedApp({ articles, tags }: Props): ReactElement {
  return (
    <Container>
      <AppRoutes articles={articles} tags={tags} />
    </Container>
  )
}

function AppRoutes({ articles, tags }: Props) {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage articles={articles} tags={tags} />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}
