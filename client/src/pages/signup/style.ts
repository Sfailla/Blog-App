import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'

const {
  color,
  typography: { subheading }
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
`

export const ContentWrapper = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Title = styled.h1`
  font-size: 4rem;
  padding: 10rem 0 5rem 0;
  color: ${({ theme }) => theme.text.secondary};
`

export const FormContainer = styled.form`
  width: 100%;
  border-radius: 1rem;
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
  color: ${color.secondary.darkgrey};
  ${subheading()};
`

export const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.4rem;
  border: 1px solid ${color.secondary.darkgrey};
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  &::placeholder {
  }
`

export const ButtonContainer = styled.div`
  width: auto;
  height: auto;
  margin-top: 3rem;
`
