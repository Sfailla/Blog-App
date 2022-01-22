import { ReactElement } from 'react'
import { Article, ArticleOrUndefined, TagList } from '../../types/shared'
import { TabbedArticleFeed, ArticleList } from '../../components'
import { CreateArticleButton } from '../buttons'
import { PlusIcon } from '../../assets/svg'
import {
  Container,
  GridContainer,
  ArticlesSection,
  TagContainer,
  TagLink,
  Title,
  TagSection,
  ButtonText
} from './style'

import { useAuthContext } from '../../context/authContext'

interface Props {
  articles: Article[]
  userArticles: ArticleOrUndefined
  tags: TagList[]
}

export default function ArticleFeed({ articles, userArticles, tags }: Props): ReactElement {
  const { user } = useAuthContext()

  return (
    <Container>
      <GridContainer>
        <ArticlesSection>
          {user ? (
            <TabbedArticleFeed
              titleList={['All Articles', 'My Articles']}
              componentList={[
                <ArticleList articles={articles} />,
                <ArticleList articles={userArticles} />
              ]}
            >
              <CreateArticleButton to="/create-article">
                <ButtonText>Create</ButtonText>
                <PlusIcon width={18} height={18} fill="#FFF" />
              </CreateArticleButton>
            </TabbedArticleFeed>
          ) : (
            <TabbedArticleFeed
              titleList={['All Articles']}
              componentList={[<ArticleList articles={articles} />]}
            />
          )}
        </ArticlesSection>
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
