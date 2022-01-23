import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'

const { color } = DesignSystem

export const Error = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: ${color.notifications.error};
`
