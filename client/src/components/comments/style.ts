import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading_lg }
} = DesignSystem

export const Container = styled.div`
  margin-top: 4rem;
`

export const Title = styled.h2`
  ${heading_lg()};
`
