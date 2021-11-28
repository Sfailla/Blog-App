///// STYLED COMPONENTS TYPES /////
import { CSSProp } from 'styled-components'
import theme from './styles/theme'

declare module 'styled-components' {
  type Theme = typeof theme
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject
  }
}

///// TYPES /////

type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

type Await<Type> = Type extends Promise<infer Value> ? Await<Value> : Type

export { NonNullProperties, Await }
