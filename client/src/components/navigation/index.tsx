import { ReactElement } from 'react'
import { NavContainer, NavList, NavLink } from './style'
import { LogoutButton } from '../buttons'
import { Avatar } from '../'
import { useAuthContext } from '../../context/auth-context'

export default function Navigation(): ReactElement {
  const { user, logout } = useAuthContext()

  return (
    <NavContainer>
      {user ? (
        <NavList>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <Avatar user={user} />
          <LogoutButton onClick={logout}>Sign out</LogoutButton>
        </NavList>
      ) : (
        <NavList>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
          <NavLink to="/signin">Sign in</NavLink>
        </NavList>
      )}
    </NavContainer>
  )
}
