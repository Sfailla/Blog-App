import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const { shadow, color } = DesignSystem

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
  box-shadow: ${shadow.sm};
`

export const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 13rem;
  box-shadow: ${shadow.md};
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

export const AddTagButton = styled(Button)`
  height: 5rem;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`

export const DeleteTagButton = styled.button`
  width: auto;
  height: 3rem;
  outline: none;
  cursor: pointer;
  border: none;
  background-color: transparent;
  ${flex()};
  color: ${({ theme }) => theme.tag.small};
`

export const PostCommentButton = styled(Button)`
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background-color: ${color.neon.blue};
`
