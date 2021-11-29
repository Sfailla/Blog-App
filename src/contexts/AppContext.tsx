import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { ChildrenPropType } from '../types'

interface AppContextInterface {
  mode: string
  setMode: (mode: string) => void
}

const AppContext = React.createContext<AppContextInterface | null>(null)

export function useContext(): AppContextInterface {
  const context = React.useContext(AppContext)

  if (!context) {
    throw new Error('useContext must be used within a AppContextProvider')
  }

  return context
}

const prefersDark: string = '(prefers-color-scheme: dark)'
const getPreferredTheme = () => (window.matchMedia(prefersDark).matches ? 'dark' : 'light')

export function AppProvider({ children }: ChildrenPropType): React.ReactElement {
  const [mode, setMode] = React.useState<string>(getPreferredTheme())
  const contextValues = React.useMemo(() => ({ mode, setMode }), [mode, setMode])

  const themeMode = mode === 'light' ? theme.light : theme.dark

  return (
    <AppContext.Provider value={contextValues}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}
