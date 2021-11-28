import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { link },
  color
} = DesignSystem

export const NavContainer = styled.div`
  width: auto;
  height: auto;
`
export const NavList = styled.ul`
  list-style: none;
  ${flex('flex-start', 'center')};
`
export const NavItem = styled.li`
  color: ${color.secondary.darkgrey};
  ${link()};
  &:not(:last-child) {
    margin-right: 1rem;
  }
`
