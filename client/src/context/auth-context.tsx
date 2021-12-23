import React, { createContext, ReactElement, ReactNode, useMemo } from 'react'
import { FieldValues } from '../../types/forms'
import { User } from '../../types/shared'
import { useAuth } from './useAuth'

interface Props {
  children: ReactNode
  [key: string]: any
}

interface AuthContextValues {
  user: User
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  // logout: () => void
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
  const { user, register, login } = useAuth()
  console.log('context is called', { user })

  const contextValues = useMemo(() => ({ user, register, login }), [user, register, login])

  return <AuthContext.Provider value={contextValues} {...props} />
}
