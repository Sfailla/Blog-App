import React from 'react'
// import styled from 'styled-components/macro'
import { Article } from '../../../../types'
import {
  Container,
  Wrapper,
  ArticlePreview,
  ArticleMeta,
  AuthorName,
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
        <Wrapper css={{ paddingTop: '50px' }}>
          <ArticleMeta>
            <Avatar src={article.image} />
            <Wrapper>
              <AuthorName>{article.author.username}</AuthorName>
              <CreatedDate>{article.createdAt}</CreatedDate>
            </Wrapper>
          </ArticleMeta>
          <Favorites>
            <FavoriteCount>{article.favoritedCount}</FavoriteCount>
          </Favorites>
        </Wrapper>
      </ArticlePreview>
    </Container>
  )
}
