import { ReactElement } from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'
import { useTags, useArticles } from '../hooks'

export default function ArticlesPage(): ReactElement {
  const { articles, userArticles } = useArticles()
  const { tags } = useTags()

  return (
    <Container>
      <Banner />
      <ArticleFeed articles={articles} userArticles={userArticles} tags={tags} />
    </Container>
  )
}
