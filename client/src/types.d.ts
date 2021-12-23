///// GLOBAL TYPE DECLARATIONS /////
import {} from 'styled-components'
import { ThemeType } from './styles/theme'

declare module 'react-router-dom'
declare module 'styled-components' {
  // extends the global DefaultTheme with our ThemeType
  export interface DefaultTheme extends ThemeType.mode {}
}

declare module 'react' {
  interface Attributes {
    css?: any
  }
}
