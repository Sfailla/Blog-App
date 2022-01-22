import { ReactElement } from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'
import { Article, Tag } from '../../types/shared'

interface Props {
  articles: Article[]
  userArticles?: Article[] | undefined
  tags: Tag[]
}

function ArticlesPage({ articles, userArticles, tags }: Props): ReactElement {
  return (
    <Container>
      <Banner />
      <ArticleFeed articles={articles} userArticles={userArticles} tags={tags} />
    </Container>
  )
}

export default ArticlesPage
