import React, { ReactElement } from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'
import useArticles from './hooks/useArticles'

export default function ArticlesPage(): ReactElement {
  const { articles } = useArticles()

  return (
    <Container>
      <Banner />
      <ArticleFeed articles={articles} tags={['sports', 'hunting', 'dancing']} />
    </Container>
  )
}
