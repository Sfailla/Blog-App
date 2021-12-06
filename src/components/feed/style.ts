import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'

const {
  layout: { normalWrapper }
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

export const ArticleContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border-top: 2px solid #30363d; */
`
export const TagContainer = styled.div`
  width: 100%;
  height: 100%;
`
