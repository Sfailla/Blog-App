import { css } from 'styled-components'

type CssType = Parameters<typeof css>

// Set Breakpoints for Responsive Layout
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

const keys = Object.keys(breakpoints) as (keyof typeof breakpoints)[]

export const media = keys.reduce((accumulator, label) => {
  const mediaSize = breakpoints[label]

  accumulator[label] = (...args: CssType) => css`
    @media all and (max-width: ${mediaSize}px) {
      ${css(...args)};
    }
  `
  return accumulator
}, {} as Record<keyof typeof breakpoints, Function>)

export const flex = (
  justify: string = 'center',
  align: string = 'center',
  direction: string = 'row'
) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`
