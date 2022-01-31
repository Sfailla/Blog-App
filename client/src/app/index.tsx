import { ReactElement } from 'react'
import { Container } from './style'
import { Navbar } from '../components'
import { useAuthContext } from '../context/authContext'
import { useArticles } from '../pages/hooks'

import AuthenticatedApp from './authenticated'
import UnauthenticatedApp from './unauthenticated'

export default function App(): ReactElement {
  const { user } = useAuthContext()
  const { tags, articles, createArticle, userArticles } = useArticles()

  return (
    <Container>
      <Navbar />
      {user ? (
        <AuthenticatedApp
          articles={articles}
          createArticle={createArticle}
          userArticles={userArticles}
          tags={tags}
        />
      ) : (
        <UnauthenticatedApp articles={articles} tags={tags} />
      )}
    </Container>
  )
}
