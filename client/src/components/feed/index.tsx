import React, { ReactElement } from 'react'
import { Container, GridContainer, ArticleContainer, TagContainer } from './style'

function ArticleFeed(): ReactElement {
  return (
    <Container>
      <GridContainer>
        <ArticleContainer></ArticleContainer>
        <TagContainer></TagContainer>
      </GridContainer>
    </Container>
  )
}

export default ArticleFeed
