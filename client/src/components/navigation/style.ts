import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { link, gradientText, heading_sm },
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

export const ListItem = styled.li`
  width: auto;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`

export const Author = styled.span`
  color: ${color.secondary.magenta};
  font-size: 14px;
  ${heading_sm()};
  font-weight: bold;
`
