import styled from 'styled-components/macro'
import { flex } from '../../../styles/mixins'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
  ${flex()};
`
