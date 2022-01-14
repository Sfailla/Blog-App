import { Article } from '../../../types/shared'
import {
  Container,
  Wrapper,
  ContentWrapper,
  ArticlePreview,
  ArticleMeta,
  AuthorName,
  ArticleTitle,
  ArticleDescription,
  ArticleBody,
  ArticleLink,
  TagsContainer,
  SmallTag,
  Avatar,
  CreatedDate,
  Favorites,
  FavoriteCount
} from './style'

interface Props {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  return (
    <Container>
      <ArticlePreview>
        <Wrapper>
          <ArticleMeta>
            <Avatar src={article.image} />
            <ContentWrapper>
              <AuthorName>{article.author.username}</AuthorName>
              <CreatedDate>{article.createdAt}</CreatedDate>
            </ContentWrapper>
          </ArticleMeta>
          <Favorites>
            <FavoriteCount>{article.favoritedCount}</FavoriteCount>
          </Favorites>
        </Wrapper>
        <ArticleBody>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleDescription>{article.description}</ArticleDescription>
        </ArticleBody>
        <Wrapper>
          <ArticleLink to="#">read more...</ArticleLink>
          <TagsContainer>
            {article.tags !== undefined &&
              article.tags.map((tag, index) => <SmallTag key={index}>{tag}</SmallTag>)}
          </TagsContainer>
        </Wrapper>
      </ArticlePreview>
    </Container>
  )
}
