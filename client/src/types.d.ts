///// GLOBAL TYPE DECLARATIONS /////
import {} from 'styled-components'
import { ThemeType } from './styles/theme' // Import type from above file
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType.mode {} // extends the global DefaultTheme with our ThemeType.
}

declare module 'react' {
  interface Attributes {
    css?: any
  }
}
