import styled, { css } from 'styled-components'

export const LayoutWrapper = styled.div`
  width: 100%;
  max-width: 114rem;
  margin: 0 auto;
`

// Design System for Project
export const DesignSystem = {
  layout: {
    normalWrapper() {
      return css`
        width: 100%;
        max-width: 114rem;
        margin: 0 auto;
      `
    }
  },
  color: {
    primary: {
      violet: '#9E7F66',
      lightviolet: '#939Bf4',
      darkblue: '#19202D',
      deepblue: '#5964E0',
      midnight: '#121721',
      teal: '#00B0B9'
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
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        font-weight: 400;
        letter-spacing: 1px;
      `
    },
    link() {
      return css`
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
      `
    },
    gradientText() {
      return css`
        display: inline-block;
        background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      `
    }
  }
}
