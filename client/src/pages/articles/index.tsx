import { ReactElement } from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'
import useArticles from './hooks/useArticles'

export default function ArticlesPage(): ReactElement {
  const { articles, userArticles, tags } = useArticles()

  return (
    <Container>
      <Banner />
      <ArticleFeed articles={articles} userArticles={userArticles} tags={tags} />
    </Container>
  )
}
