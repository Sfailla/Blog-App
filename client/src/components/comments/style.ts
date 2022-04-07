import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'
import { flex } from '../../styles/mixins'

const {
  typography: { heading_lg },
  color
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  margin-top: 10rem;
`

export const Title = styled.h4`
  ${heading_lg()};
  color: ${({ theme }) => theme.text.primary};
  font-size: 2.4rem;
  margin-bottom: 2rem;
`

export const Form = styled.form`
  width: 100%;
  height: auto;
  /* border-bottom: 1px solid lightgray; */
  padding-bottom: 3rem;
`

export const FormGroup = styled.div`
  width: inherit;
  height: inherit;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 12rem;
  border: 2px solid lightgray;
  outline: none;
  padding: 2rem;
  border-radius: 8px;
  background-color: transparent;
  resize: none;
`

export const Divider = styled.span`
  width: 100%;
  display: block;
  background-color: lightgray;
  height: 2px;
  margin: 2rem 0;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
`

export const CommentLayoutWrapper = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding-top: 5rem;
`

export const Wrapper = styled.div`
  ${flex('center', 'flex-start', 'column')};
  row-gap: 1rem;
`

export const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: lightblue;
`

export const Author = styled.h4`
  color: ${color.neon.blue};
`

export const FeedContainer = styled.div``

export const CommentContainer = styled.div`
  padding: 3rem 0;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(100% - 6rem);
    height: 1px;
    background-color: ${({ theme }) => theme.border.light};
  }
`

export const CommentBody = styled.p`
  color: ${({ theme }) => theme.text.comment};
`
