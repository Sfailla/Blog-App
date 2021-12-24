import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  color,
  typography: { heading_sm }
} = DesignSystem

export const Container = styled.div`
  ${flex('flex-start')};
`

export const AvatarLogo = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: lightblue;
`

export const AvatarName = styled.span`
  color: ${color.secondary.magenta};
  font-size: 14px;
  ${heading_sm()};
  font-weight: bold;
`
