import React from 'react'
import { NavContainer, NavList, NavLink } from './style'

function Navigation(): React.ReactElement {
  return (
    <NavContainer>
      <NavList>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </NavList>
    </NavContainer>
  )
}

export default Navigation
