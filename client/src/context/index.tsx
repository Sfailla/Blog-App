import { ReactElement, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './themeContext'
import { AuthProvider } from './authContext'
import { DataProvider } from './dataContext'

interface Props {
  children: ReactNode
}

export function AppProviders({ children }: Props): ReactElement {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}
