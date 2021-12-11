import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading_lg },
  color
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  height: 5.6rem;
  padding: 0.5rem 2rem;
  background-color: ${({ theme }) => theme.background.primary};
  ${flex()};
`

export const ContentWrapper = styled.div`
  width: auto;
  height: 2.5rem;
  ${flex('space-between', 'center')};
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 114rem;
  ${flex('space-between', 'center')};
`

export const VerticalDivider = styled.span`
  width: 2px;
  height: 100%;
  margin: 0 2rem;
  background-color: ${color.secondary.grey};
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 2rem;
  ${heading_lg()};
`
