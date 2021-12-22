import styled from 'styled-components/macro'

const Button = styled.button`
  width: auto;
  height: 4rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.7rem;
  letter-spacing: 1px;
  background-color: ${({ theme }) => theme.button.normal};
  cursor: pointer;
`

export const RegisterButton = styled(Button)`
  width: 100%;
  max-width: 13rem;
`
