import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading }
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  height: 5.6rem;
  padding: 0.5rem 2rem;
  background-color: ${({ theme }) => theme.background.primary};
  ${flex()};
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 114rem;
  ${flex('space-between', 'center')};
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 2rem;
  ${heading()};
`
