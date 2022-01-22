import React, { ReactElement, ReactNode, useContext, createContext, useMemo, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme, ThemeType } from '../styles/theme'
import { Mode } from '../types/shared'

interface Context {
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}

type ThemeMode = ThemeType['light'] | ThemeType['dark']

const ThemeContext = createContext<Context | null>(null)

export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useContext must be used within a AppContextProvider')
  }

  return context
}

const prefersDark: string = '(prefers-color-scheme: dark)'
const getPreferredTheme = () => (window.matchMedia(prefersDark).matches ? 'dark' : 'light')

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props): ReactElement {
  const [mode, setMode] = useState<Mode>(getPreferredTheme())
  const contextValues: Context = useMemo(() => ({ mode, setMode }), [mode, setMode])
  const themeMode: ThemeMode = theme[mode]

  return (
    <ThemeContext.Provider value={contextValues}>
      <StyledThemeProvider theme={themeMode}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
