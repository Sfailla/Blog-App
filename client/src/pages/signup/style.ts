import styled from 'styled-components/macro'

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

export const FormContainer = styled.form`
  width: 100%;
  border-radius: 1rem;
`

export const ButtonContainer = styled.div`
  width: auto;
  height: auto;
  margin-top: 3rem;
`

export const ErrorContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
`
