import { ReactElement } from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'
import useArticles from './hooks/useArticles'

function ArticlesPage(): ReactElement {
  const { articles } = useArticles()

  return (
    <Container>
      <Banner />
      <ArticleFeed articles={articles} />
    </Container>
  )
}

export default ArticlesPage
