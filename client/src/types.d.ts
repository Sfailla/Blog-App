///// GLOBAL TYPE DECLARATIONS /////
import {} from 'styled-components/cssprop'
import { ThemeType } from './styles/theme'

declare module 'react-router-dom' {}
declare module 'styled-components' {
  // extends the global DefaultTheme with our ThemeType
  export interface DefaultTheme extends ThemeType.mode {}
}
