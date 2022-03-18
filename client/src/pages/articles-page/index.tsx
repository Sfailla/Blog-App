import { ReactElement } from 'react'
import { Container } from './style'
import { Banner, ArticleFeed } from '../../components'

function ArticlesPage(): ReactElement {
  return (
    <Container>
      <Banner />
      <ArticleFeed />
    </Container>
  )
}

export default ArticlesPage
