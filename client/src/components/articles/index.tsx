import React, { ReactElement } from 'react'
import { Article } from '../../../types'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TabContainer,
  Tab,
  Tag,
  Content,
  Title,
  TagContent
} from './style'
import { ArticleCard } from '../../components'

interface Props {
  articles: Article[]
  tags: string[]
}

export default function ArticleFeed({ articles, tags }: Props): ReactElement {
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
