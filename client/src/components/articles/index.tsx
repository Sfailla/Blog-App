import { ReactElement } from 'react'
import { Article, Tag } from '../../../types/shared'
import { TabbedArticleFeed, ArticleList } from '../../components'
import {
  Container,
  GridContainer,
  ArticlesContainer,
  TagContainer,
  TagLink,
  Title,
  TagSection
} from './style'

import { useAuthContext } from '../../context/auth-context'

interface Props {
  articles: Article[]
  userArticles: Article[]
  tags: Tag[]
}

export default function ArticleFeed({ articles, userArticles, tags }: Props): ReactElement {
  const { user } = useAuthContext()

  return (
    <Container>
      <GridContainer>
        <ArticlesContainer>
          {user ? (
            <TabbedArticleFeed
              titleList={['All Articles', 'My Articles']}
              componentList={[
                <ArticleList articles={articles} />,
                <ArticleList articles={userArticles} />
              ]}
            />
          ) : (
            <TabbedArticleFeed
              titleList={['All Articles']}
              componentList={[<ArticleList articles={articles} />]}
            />
          )}
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
