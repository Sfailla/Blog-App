import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
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

export const MainContent = styled.div`
  width: 100%;
  max-width: 85rem;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Form = styled.form`
  margin-top: 1rem;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 5rem;
  ${flex('flex-start')};
`

export const TagInput = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-family: monospace;
  font-size: 1.4rem;
  border: 1px solid #6e8098;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  &:focus-visible {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const TagListItems = styled.div`
  display: flex;
  margin: 2rem 0 1rem 0;
`

export const Tag = styled.span`
  width: fit-content;
  height: 3rem;
  padding: 1rem;
  font-size: 1rem;
  ${flex('flex-start')};
  ${subheading()}
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.tag.small};
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  user-select: none;
  column-gap: 0.5rem;
  color: ${({ theme }) => theme.tag.small};

  &:hover,
  &:hover > button {
    background-color: ${color.neon.blue};
    color: ${color.secondary.white};
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const NoTagMessage = styled.span``

export const ButtonContainer = styled.div``
