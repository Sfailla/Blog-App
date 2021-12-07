import React, { ReactElement } from 'react'
import { Article } from '../../../types'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TabContainer,
  Tab,
  Content
} from './style'
import { ArticleCard } from '../../components'

function ArticleFeed({ articles }: { articles: Article[] }): ReactElement {
  return (
    <Container>
      <GridContainer>
        <ArticlesContainer>
          <TabContainer>
            <Tab>Global Feed</Tab>
          </TabContainer>
          <Content>
            {articles.length > 0 ? (
              articles.map(article => {
                console.log({ article })
                return <ArticleCard key={article.id} article={article} />
              })
            ) : (
              <p>Loading...</p>
            )}
            {articles.length > 0 && <ArticleCard key={articles[0]?.id} article={articles[0]} />}
          </Content>
        </ArticlesContainer>
        <TagContainer></TagContainer>
      </GridContainer>
    </Container>
  )
}

export default ArticleFeed
