import styled from 'styled-components/macro'
// import { headerHeight } from '../../styles/shared'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
`

export const MainContent = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Form = styled.form`
  margin-top: 2rem;
`

export const ButtonContainer = styled.div``
