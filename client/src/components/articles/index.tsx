import { ReactElement } from 'react'
import { Article, Tag } from '../../../types/shared'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TabContainer,
  Tab,
  TagLink,
  Content,
  Title,
  TagSection
} from './style'
import { ArticleCard } from '../../components'

interface Props {
  articles: Article[]
  tags: Tag[]
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
        <TagSection>
          <Title>Popular Tags:</Title>
          <TagContainer>
            {tags.map((tag, index) => (
              <TagLink key={index}>{tag}</TagLink>
            ))}
          </TagContainer>
        </TagSection>
      </GridContainer>
    </Container>
  )
}
