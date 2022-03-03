import { ReactElement, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './themeContext'
import { AuthProvider } from './authContext'
import ScrollRestore from '../app/scrollRestore'

interface Props {
  children: ReactNode
}

export function AppProviders({ children }: Props): ReactElement {
  return (
    <Router>
      <ScrollRestore>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ScrollRestore>
    </Router>
  )
}
