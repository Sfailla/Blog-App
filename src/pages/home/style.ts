import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  ${flex('flex-start', 'flex-start', 'column')};
`
