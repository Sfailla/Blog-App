import React, { createContext, ReactElement, ReactNode, useMemo } from 'react'
import { FieldValues } from '../types/forms'
import { User } from '../types/shared'
import { useAuth } from './useAuth'
import { FullPageSpinner } from '../components'

interface Props {
  children: ReactNode
  [key: string]: any
}

interface AuthContextValues {
  user: User
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  logout: () => void
  error: string
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)
AuthContext.displayName = 'AuthContext'

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export function AuthProvider(props: Props): ReactElement {
  const { user, register, login, logout, loading, error } = useAuth()

  const contextValues = useMemo(
    () => ({ user, register, login, logout, loading, error }),
    [user, register, login, logout, loading, error]
  )

  if (loading) {
    return <FullPageSpinner />
  }

  return <AuthContext.Provider value={contextValues} {...props} />
}
