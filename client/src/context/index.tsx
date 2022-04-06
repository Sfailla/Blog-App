import { ReactElement, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './themeContext'
import { AuthProvider } from './authContext'
import { ArticleProvider } from './articleContext'
import ScrollRestore from '../app/scrollRestore'

interface Props {
  children?: ReactNode
}

export function AppProviders({ children }: Props): ReactElement {
  return (
    <Router>
      <ScrollRestore>
        <ThemeProvider>
          <AuthProvider>
            <ArticleProvider>{children}</ArticleProvider>
          </AuthProvider>
        </ThemeProvider>
      </ScrollRestore>
    </Router>
  )
}
