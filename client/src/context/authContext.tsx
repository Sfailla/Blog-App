import React, { createContext, ReactElement, ReactNode, useMemo } from 'react'
import { FieldValues } from '../types/forms'
import { User, Profile } from '../types/shared'
import { useAuth } from './useAuth'
import { FullPageSpinner } from '../components'

interface Props {
  children: ReactNode
}

interface AuthContextValues {
  user: User | null
  profile: Profile | null
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  logout: () => void
  loading: boolean
  error: string
}

const AuthContext = createContext<AuthContextValues | null>(null)
AuthContext.displayName = 'AuthContext'

export function useAuthContext(): AuthContextValues {
  const context = React.useContext(AuthContext)
  if (context === undefined || context === null) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export function AuthProvider(props: Props): ReactElement {
  const { user, profile, register, login, logout, loading, error } = useAuth()

  const contextValues = useMemo(
    () => ({ user, profile, register, login, logout, loading, error }),
    [user, profile, register, login, logout, loading, error]
  ) as AuthContextValues

  if (loading) {
    return <FullPageSpinner />
  }

  return <AuthContext.Provider value={contextValues} {...props} />
}
