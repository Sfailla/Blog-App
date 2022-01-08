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

export const Title = styled.h1`
  font-size: 4rem;
  padding: 10rem 0 5rem 0;
  color: ${({ theme }) => theme.text.secondary};
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
