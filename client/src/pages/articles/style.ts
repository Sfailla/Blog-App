import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'

export const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  ${flex('flex-start', 'flex-start', 'column')};
`
