import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, CreateArticlePage, ArticleDetails } from '../../pages'
import { Container } from '../style'
import { Article, Tag } from '../../types/shared'
import { CreateArticleFields } from '../../types/forms'

interface Props {
  articles: Article[]
  userArticles: Article[]
  createArticle: (articleFields: CreateArticleFields) => void
  tags: Tag[]
}

export default function AuthenticatedApp({
  articles,
  userArticles,
  createArticle,
  tags
}: Props): ReactElement {
  return (
    <Container>
      <AppRoutes
        articles={articles}
        userArticles={userArticles}
        createArticle={createArticle}
        tags={tags}
      />
    </Container>
  )
}

function AppRoutes({ articles, userArticles, createArticle, tags }: Props): ReactElement {
  return (
    <Routes>
      <Route
        path="/"
        element={<ArticlesPage articles={articles} userArticles={userArticles} tags={tags} />}
      />
      <Route path="/create-article" element={<CreateArticlePage createArticle={createArticle} />} />
      <Route path="/article/:slug" element={<ArticleDetails />} />
    </Routes>
  )
}
