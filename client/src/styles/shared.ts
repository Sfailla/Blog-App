import styled, { css } from 'styled-components'

export const headerHeight = 5.6
export const layoutWidth = 114

// PAGE AND LAYOUT
export const PageContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.primary};
`

export const LayoutWrapper = styled.div`
  width: 100%;
  max-width: ${layoutWidth}rem;
  margin: 0 auto;
`

export const PageTitle = styled.h1`
  font-size: 4rem;
  padding: 8rem 0 5rem 0;
  font-family: MD Primer Bold, Rubik, Lato, Lucida Grande, Lucida Sans Unicode, Tahoma, Sans-Serif;
  font-weight: 700;
  font-style: normal;
  font-size: clamp(4rem, 1rem + 3.5vw, 4rem);
  text-shadow: 0 2px 2px rgb(0 0 0 / 50%);
  color: ${({ theme }) => theme.text.secondary};
`

// FORMS AND INPUTS
export const FormGroup = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: #6e8098;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
`

export const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 1.4rem;
  border: 1px solid #6e8098;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  &::placeholder {
  }
`

// Design System for Project
export const DesignSystem = {
  layout: {
    layoutWrapper() {
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
      deepblue: '#1f3b6f',
      midnight: '#121721',
      teal: '#00B0B9'
    },
    secondary: {
      white: '#FFFFFF',
      lightgrey: '#F4F6F8',
      grey: '#9DAEC2',
      darkgrey: '#6E8098',
      darkgray: 'darkgray',
      aqua: '#64ffda',
      magenta: '#ff0097'
    },
    text: {
      medium: '#3a4a61'
    },
    neon: {
      blue: '#0085FF',
      // green: '#a3a0a0',
      green: '#3fb950',
      magenta: '#ff0097',
      // red: '#e92c2c'
      red: '#da3633',
      purple: '#8860d2'
    },
    notifications: {
      success: '#47d764',
      error: '#dc3545',
      info: '#2f86eb',
      warning: '#ffc021'
    },
    background: {
      banner: '#012057'
    }
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
  },
  typography: {
    heading_lg() {
      return css`
        font-family: 'Arimo', sans-serif;
        font-weight: bold;
        text-transform: capitalize;
        letter-spacing: 1px;
      `
    },
    heading_sm() {
      return css`
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
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
        /* fallback for old browsers */
        background: #2980b9;
        /* Chrome 10-25, Safari 5.1-6 */
        background: -webkit-linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      `
    },
    articleTitle() {
      return css`
        font-family: MD Primer Bold, Rubik, Lato, Lucida Grande, Lucida Sans Unicode, Tahoma,
          Sans-Serif;
        font-weight: 700;
        font-style: normal;
        font-size: clamp(1.2rem, 1rem + 3.5vw, 5rem);
        text-shadow: 0 2px 2px rgb(0 0 0 / 50%);
      `
    }
  }
}
