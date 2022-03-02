import styled, { css } from 'styled-components'

export const headerHeight = '5.6rem'
export const layoutWidth = '114rem'

export const PageContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.primary};
`

export const LayoutWrapper = styled.div`
  width: 100%;
  max-width: ${layoutWidth};
  margin: 0 auto;
`

export const PageTitle = styled.h1`
  font-size: 4rem;
  padding: 8rem 0 5rem 0;
  color: ${({ theme }) => theme.text.secondary};
`

export const FormGroup = styled.div`
  width: 100%;
  height: 100%;
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

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 10rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
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
    mainWrapper() {
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
      darkgrey: '#6E8098',
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
      // red: '#e92c2c'
      red: '#da3633',
      purple: '#8860d2'
    },
    notifications: {
      success: '#47d764',
      error: '#dc3545',
      info: '#2f86eb',
      warning: '#ffc021'
    }
  },
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
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
        font-weight: 500;
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
        /* background: linear-gradient(to right, #10b981, #3b82f6, #8b5cf6); */
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      `
    }
  }
}
