import styled from 'styled-components/macro'
import { DesignSystem, headerHeight } from '../../../styles/shared'

const { typography, color } = DesignSystem
const { articleTitle, heading_sm } = typography

export const Container = styled.div`
  width: 100%;
  height: calc(100% - ${headerHeight}rem);
`

export const ArticleTitle = styled.h2`
  ${articleTitle()};
  line-height: 1.4;
  padding: 2rem 0;
  color: ${({ theme }) => theme.text.secondary};
`

export const ArticleMeta = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
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

export const CreatedDate = styled.span`
  font-size: 1.2rem;
  color: ${color.secondary.darkgrey};
`

export const ArticleBody = styled.div`
  margin-top: 4rem;
  font-size: 1.8rem;
  line-height: 1.5;
  background: ${({ theme }) => theme.background.text};
  color: ${({ theme }) => theme.text.gray};
  overflow-wrap: break-word;
  border-radius: 8px;
  padding: 4rem;
  position: relative;
`

export const MarkdownContainer = styled.div`
  font-family: 'Lato', 'Roboto', sans-serif;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
  & > ul {
    margin-left: 40px;
    margin-bottom: 1rem;
  }
  & a {
    display: inline-block;
    text-decoration: none;
    color: ${({ theme }) => theme.link.hover};
  }
`
