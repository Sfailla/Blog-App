import { ReactElement } from 'react'
import { NavContainer, NavList, NavLink } from './style'
import { Avatar } from '../'
import { useAuthContext } from '../../context/auth-context'

export default function Navigation(): ReactElement {
  const { user } = useAuthContext()

  console.log({ user })

  return (
    <NavContainer>
      {user ? (
        <NavList>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/article">New Post</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <Avatar user={user} />
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
