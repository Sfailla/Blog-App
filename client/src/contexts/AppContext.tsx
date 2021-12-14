import React, { ReactElement, ReactNode, useContext, createContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, ThemeType } from '../styles/theme'

type PreferredMode = 'light' | 'dark'

interface Context {
  mode: PreferredMode
  setMode: React.Dispatch<React.SetStateAction<PreferredMode>>
}

type ThemeMode = ThemeType['light'] | ThemeType['dark']

const AppContext = createContext<Context | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useContext must be used within a AppContextProvider')
  }

  return context
}

const prefersDark: string = '(prefers-color-scheme: dark)'
const getPreferredTheme: () => PreferredMode = () =>
  window.matchMedia(prefersDark).matches ? 'dark' : 'light'

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props): ReactElement {
  const [mode, setMode] = useState<PreferredMode>(getPreferredTheme())
  const contextValues: Context = useMemo(() => ({ mode, setMode }), [mode, setMode])
  const themeMode: ThemeMode = theme[mode]

  return (
    <AppContext.Provider value={contextValues}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}
