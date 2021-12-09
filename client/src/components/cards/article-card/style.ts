import styled from 'styled-components/macro'
import { DesignSystem } from '../../../styles/shared'

const { color } = DesignSystem

export const Container = styled.li`
  width: 100%;
  height: fit-content;
  list-style: none;
  padding: 2rem 0;
`

export const ArticlePreview = styled.div`
  color: ${color.secondary.darkgrey};
`

export const ArticleMeta = styled.div`
  display: flex;
`
export const Wrapper = styled.div``
export const AuthorName = styled.h4``
export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: lightblue;
`
export const CreatedDate = styled.span``
export const Favorites = styled.div`
  width: 5rem;
  height: 3rem;
  border: ${({ theme }) => `1px solid ${theme.text.primary}`};
`
export const FavoriteCount = styled.span``
