import React, { ReactElement, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './theme-context'

interface Props {
  children: ReactNode
}

export function AppProviders({ children }: Props): ReactElement {
  return (
    <Router>
      <ThemeProvider>{children}</ThemeProvider>
    </Router>
  )
}
