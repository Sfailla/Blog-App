import { ReactElement } from 'react'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TabContainer,
  Tab,
  Content
} from './style'
import { Article } from '../../../types'

interface Props {
  articles: Article[]
}

function ArticleFeed({ articles }: Props): ReactElement {
  return (
    <Container>
      <GridContainer>
        <ArticlesContainer>
          <TabContainer>
            <Tab>Global Feed</Tab>
          </TabContainer>
          <Content>Articles</Content>
        </ArticlesContainer>
        <TagContainer></TagContainer>
      </GridContainer>
    </Container>
  )
}

export default ArticleFeed
