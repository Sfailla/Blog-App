import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { link, gradientText },
  color
} = DesignSystem

export const NavContainer = styled.div`
  width: auto;
  height: auto;
`
export const NavList = styled.ul`
  list-style: none;
  ${flex('flex-start', 'center')};
  & > button {
    margin-left: 1rem;
  }
`
export const NavLink = styled(Link)`
  color: ${color.secondary.darkgrey};
  ${link()};
  &:not(:last-child) {
    margin-right: 1rem;
  }
  &:hover {
    ${gradientText()};
  }
`
