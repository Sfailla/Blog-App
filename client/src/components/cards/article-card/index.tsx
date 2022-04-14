import useRippleEffect from '../../../animations/ripple'
import { Article } from '../../../types/shared'
import { Avatar } from '../../../components'
import { convertToReadableDate } from '../../../utils/helperFns'
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
  CreatedDate,
  Favorites,
  FavoriteCount
} from './style'

interface Props {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const [makeRipples, ripples] = useRippleEffect()

  return (
    <Container>
      <ArticlePreview>
        <Wrapper>
          <ArticleMeta>
            <Avatar user={article.author} />
            <ContentWrapper>
              <AuthorName>{article.author.username}</AuthorName>
              <CreatedDate>{convertToReadableDate(article.createdAt)}</CreatedDate>
            </ContentWrapper>
          </ArticleMeta>
          <Favorites onMouseDown={makeRipples}>
            {ripples}
            <FavoriteCount>{article.favoritedCount}</FavoriteCount>
          </Favorites>
        </Wrapper>
        <ArticleBody>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleDescription>{article.description}</ArticleDescription>
        </ArticleBody>
        <Wrapper>
          <ArticleLink to={`/article/${article.slug}`} state={{ article }}>
            read more...
          </ArticleLink>
          <TagsContainer>
            {article.tags !== undefined &&
              article.tags.map((tag, index) => <SmallTag key={index}>{tag}</SmallTag>)}
          </TagsContainer>
        </Wrapper>
      </ArticlePreview>
    </Container>
  )
}
