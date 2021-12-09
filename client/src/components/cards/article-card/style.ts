import styled from 'styled-components/macro'
import { DesignSystem } from '../../../styles/shared'
import { flex } from '../../../styles/mixins'

const {
  color,
  typography: { subheading }
} = DesignSystem

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
export const Wrapper = styled.div`
  margin-bottom: 1rem;
  ${flex('space-between')};
`
export const ContentWrapper = styled.div``

export const AuthorName = styled.h4`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.secondary};
`
export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: lightblue;
`
export const CreatedDate = styled.span`
  font-size: 1.2rem;
`
export const Favorites = styled.div`
  width: 5rem;
  height: 3rem;
  border: ${({ theme }) => `1px solid ${theme.text.secondary}`};
  border-radius: 5px;
`
export const FavoriteCount = styled.span``

export const ArticleBody = styled.div`
  margin-bottom: 1.5rem;
`

export const ArticleTitle = styled.h1`
  color: ${({ theme }) => theme.text.primaryLight};
  font-size: 2.3rem;
  font-weight: 500;
  margin-bottom: 3px;
`

export const ArticleDescription = styled.p``

export const ArticleLink = styled.a``
export const TagsContainer = styled.div`
  display: flex;
`

export const SmallTag = styled.li`
  width: fit-content;
  height: 2rem;
  padding: 1rem;
  ${flex()};
  ${subheading()}
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.tag.small};
  border: 1px solid ${({ theme }) => theme.tag.small};
  border-radius: 2rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
