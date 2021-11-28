import { css } from 'styled-components'

// Design System for Project
export const DesignSystem = {
  color: {
    primary: {
      violet: '#9E7F66',
      lightviolet: '#939Bf4',
      darkblue: '#19202D',
      deepblue: '#5964E0',
      midnight: '#121721'
    },
    secondary: {
      white: '#FFFFFF',
      lightgrey: '#F4F6F8',
      grey: '#9DAEC2',
      darkgrey: '#6E8098'
    }
  },
  shadow: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
  },
  typography: {
    heading() {
      return css`
        font-family: 'Arimo', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      `
    },
    subheading() {
      return css`
        font-family: 'Lato', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.5px;
      `
    },
    link() {
      return css`
        text-decoration: none;
        cursor: pointer;
      `
    },
    gradientText() {
      return css`
        background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      `
    }
  }
}
