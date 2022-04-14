import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading_sm }
} = DesignSystem

interface StyledProps {
  background: string | null
}

export const Container = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background-color: ${({ background }: StyledProps) => (background ? background : `transparent`)};
  ${flex()};
`

export const AvatarLetter = styled.span`
  color: white;
  font-size: 2rem;
`

export const AvatarLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
