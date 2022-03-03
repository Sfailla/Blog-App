import styled from 'styled-components/macro'
import { headerHeight } from '../styles/shared'

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight}rem);
`
