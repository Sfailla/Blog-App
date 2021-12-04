import React, { ReactElement } from 'react'
import { NavContainer, NavList, NavLink } from './style'

function Navigation(): ReactElement {
  return (
    <NavContainer>
      <NavList>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
      </NavList>
    </NavContainer>
  )
}

export default Navigation
