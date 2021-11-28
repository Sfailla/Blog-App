import React from 'react'
import { NavContainer, NavList, NavItem } from './style'

function Navigation(): React.ReactElement {
  return (
    <NavContainer>
      <NavList>
        <NavItem>Home</NavItem>
        <NavItem>Signin</NavItem>
        <NavItem>Signout</NavItem>
      </NavList>
    </NavContainer>
  )
}

export default Navigation
