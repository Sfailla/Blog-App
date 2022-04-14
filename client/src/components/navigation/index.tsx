import { ReactElement } from 'react'
import { NavContainer, NavList, NavLink, ListItem, Author } from './style'
import { LogoutButton } from '../buttons'
import { Avatar } from '../'
import { useAuthContext } from '../../context/authContext'

export default function Navigation(): ReactElement {
  const { user, profile, logout } = useAuthContext()

  return (
    <NavContainer>
      {user && profile ? (
        <NavList>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <ListItem>
            <Avatar user={profile} />
          </ListItem>
          <ListItem>
            <Author>{profile.username}</Author>
          </ListItem>
          <LogoutButton onClick={logout}>Sign out</LogoutButton>
        </NavList>
      ) : (
        <NavList>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Sign up</NavLink>
          <NavLink to="/login">Sign in</NavLink>
        </NavList>
      )}
    </NavContainer>
  )
}
