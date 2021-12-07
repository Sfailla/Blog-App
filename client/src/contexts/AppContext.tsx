import React, { ReactElement, ReactNode, useContext, createContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

type Context = {
  mode: string
  setMode: (mode: string) => void
}

const AppContext = createContext<Context | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useContext must be used within a AppContextProvider')
  }

  return context
}

type PreferredMode = () => 'light' | 'dark'

const prefersDark: string = '(prefers-color-scheme: dark)'
const getPreferredTheme: PreferredMode = () =>
  window.matchMedia(prefersDark).matches ? 'dark' : 'light'

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props): ReactElement {
  const [mode, setMode] = useState<string>(getPreferredTheme())
  const contextValues = useMemo(() => ({ mode, setMode }), [mode, setMode])

  const themeMode = mode === 'light' ? theme.light : theme.dark

  return (
    <AppContext.Provider value={contextValues}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}
