import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'
import { flex } from '../../styles/mixins'

const {
  layout: { normalWrapper },
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
  ${normalWrapper()};
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
`

export const ArticlesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
`
export const TagContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background: lightpink; */
`

export const TabContainer = styled.ul`
  width: 100%;
  height: 4.2rem;
  border-bottom: 2px solid #9daec2;
  /* border-bottom: 2px solid #30363d; */
`
export const Tab = styled.li`
  width: 11.2rem;
  height: 4.2rem;
  padding: 8px 1.5rem;
  ${flex()};
  color: ${({ theme }) => theme.text.secondary};
`
export const Content = styled.ul``

export const Title = styled.h2`
  height: 4.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  padding: 0.8rem 1.5rem;
  color: ${({ theme }) => theme.text.secondary};
  ${flex('flex-start', 'center')};
`
export const TagContent = styled.ul`
  padding: 1rem 1.5rem;
  min-height: 25rem;
  ${flex('flex-start', 'flex-start')};
`

export const Tag = styled.li`
  width: fit-content;
  height: 2.5rem;
  padding: 1rem;
  ${flex()};
  ${subheading()}
  font-size: 1.2rem;
  font-weight: 500;
  color: ${color.secondary.darkgrey};
  border: 1px solid ${color.secondary.darkgrey};
  border-radius: 2rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
