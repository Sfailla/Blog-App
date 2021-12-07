///// STYLED COMPONENTS TYPES /////
import { CSSProp } from 'styled-components'
import theme from './styles/theme'

declare module 'styled-components' {
  type Theme = typeof theme
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: ThemedCssFunction<DefaultTheme>
    $on?: CSSProp | CSSObject
  }
}
