import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { DesignSystem } from '../../../styles/shared'
import { flex, media } from '../../../styles/mixins'

const {
  color,
  typography: { subheading, heading_sm }
} = DesignSystem

export const Container = styled.li`
  width: 100%;
  height: fit-content;
  list-style: none;
  padding: 2rem 0;
  border-bottom: 1px solid ${color.secondary.grey};
`

export const ArticlePreview = styled.div`
  color: ${color.secondary.darkgrey};
`

export const ArticleMeta = styled.div`
  display: flex;
`
export const Wrapper = styled.div`
  ${flex('space-between')};
  &:first-child {
  }
  &:last-child {
    ${media.lg`
      ${flex('flex-start', 'center', 'column-reverse')};
      row-gap: 1rem;
    `};
  }
`
export const ContentWrapper = styled.div`
  margin-left: 1rem;
`

export const AuthorName = styled.h4`
  font-size: 1.4rem;
  ${heading_sm()}
  cursor: pointer;
  color: ${color.neon.blue};
  &:hover {
    color: ${({ theme }) => theme.link.hover};
  }
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
  border: 1px solid ${color.neon.blue};
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: ${color.neon.blue};
  }
`
export const FavoriteCount = styled.span``

export const ArticleBody = styled.div`
  margin: 2rem 0;
  ${media.lg`
    text-align: center;
    padding: 1rem 0;
  `};
`

export const ArticleTitle = styled.h1`
  color: ${({ theme }) => theme.text.primaryLight};
  font-size: 2.3rem;
  font-weight: 500;
  margin-bottom: 3px;
`

export const ArticleDescription = styled.p``

export const ArticleLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;
  text-decoration: none;
  color: ${color.neon.blue};
  &:hover {
    color: ${color.neon.magenta};
  }
`

export const TagsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

export const SmallTag = styled.span`
  width: fit-content;
  height: 2rem;
  padding: 1rem;
  font-size: 1rem;
  ${flex()};
  ${subheading()}
  font-weight: 400;
  color: ${({ theme }) => theme.tag.small};
  border: 1px solid ${({ theme }) => theme.tag.small};
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    background-color: ${color.neon.blue};
    color: ${color.secondary.white};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
