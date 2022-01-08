import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { flex } from '../../styles/mixins'

const Button = styled.button`
  width: auto;
  height: 4rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: none;
  outline: none;
  color: #fff;
  user-select: none;
  font-size: 1.7rem;
  letter-spacing: 1px;
  background-color: ${({ theme }) => theme.button.normal};
  cursor: pointer;
`

export const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 13rem;
`

export const LogoutButton = styled(Button)`
  width: 100%;
  height: 3rem;
  max-width: 13rem;
  font-size: 1.4rem;
  border-radius: 5px;
`

export const CreateArticleButton = styled(Link)`
  white-space: nowrap;
  height: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  text-decoration: none;
  ${flex()};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.button.normal};
  & > svg {
    margin-left: 3px;
  }
`
