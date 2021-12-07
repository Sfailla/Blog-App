import React from 'react'
import { Article } from '../../../../types'
import {
  Container,
  Header,
  AuthorDetails,
  AuthorName,
  Avatar,
  CreatedDate,
  FavoriteWrapper,
  FavoriteCount
} from './style'

interface Props {
  article: Article
  key: string
}

function ArticleCard({ article }: Props) {
  return (
    <Container>
      <Header>
        <AuthorDetails>
          <Avatar src={article.image} />
          <AuthorName>{article.author.username}</AuthorName>
          <CreatedDate>{article.createdAt}</CreatedDate>
        </AuthorDetails>
        <FavoriteWrapper>
          <FavoriteCount>{article.favoritedCount}</FavoriteCount>
        </FavoriteWrapper>
      </Header>
    </Container>
  )
}

export default ArticleCard
