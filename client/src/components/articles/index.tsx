import React, { ReactElement } from 'react'
import { Article } from '../../../types'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TabContainer,
  Tab,
  Content,
  Title,
  TagContent,
  Tag
} from './style'
import { ArticleCard } from '../../components'

function ArticleFeed({ articles, tags }: { articles: Article[]; tags: string[] }): ReactElement {
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
          </Content>
        </ArticlesContainer>
        <TagContainer>
          <Title>Popular Tags:</Title>
          <TagContent>
            {tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContent>
        </TagContainer>
      </GridContainer>
    </Container>
  )
}

export default ArticleFeed
