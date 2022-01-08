import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'
import { flex, media } from '../../styles/mixins'

const {
  layout: { mainWrapper },
  typography: { subheading },
  color
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  flex: 1;
`

export const GridContainer = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  ${mainWrapper()};
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 3fr 27.5rem;
  grid-template-rows: 1fr;
  ${media.md`
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    row-gap: 2rem;
  `}
`

export const ArticlesSection = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  ${media.md`
    grid-row: 2 / 3;
  `};
`
export const TagSection = styled.div`
  width: 100%;
  height: 100%;
  ${media.md`
    height: auto;
    grid-row: 1 / 2;
  `};
`

export const Title = styled.h2`
  height: 4.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  padding: 0.8rem 1.5rem;
  color: ${({ theme }) => theme.text.secondary};
  ${flex('flex-start', 'center')};
`
export const TagContainer = styled.ul`
  padding: 1rem 1.5rem;
  min-height: 25rem;
  ${flex('flex-start', 'flex-start')};
  flex-wrap: wrap;
  row-gap: 10px;
  align-content: flex-start;
  ${media.md`
    min-height: 15rem;
  `};
`

export const TagLink = styled.li`
  width: fit-content;
  height: 2.5rem;
  padding: 1rem;
  ${flex()};
  ${subheading()}
  font-size: 1.1rem;
  font-weight: 500;
  color: ${color.secondary.darkgrey};
  border: 1px solid ${color.secondary.darkgrey};
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    color: ${color.neon.red};
    border: 1px solid ${color.neon.red};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const ButtonText = styled.span`
  height: 100%;
  font-size: 1.2rem;
  white-space: nowrap;
  color: white;
  ${flex('center')};
`
