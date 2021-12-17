import styled from 'styled-components/macro'
import { vars } from '../../styles/shared'

export const Container = styled.div`
  width: 100%;
  height: calc(100% - ${vars.headerHeight});
`
