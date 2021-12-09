///// GLOBAL TYPE DECLARATIONS /////
import { CSSProp } from 'styled-components'
import theme from './styles/theme'

declare module 'styled-components' {
  type Theme = typeof theme
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
    $on?: CSSProp | CSSObject
  }
}
