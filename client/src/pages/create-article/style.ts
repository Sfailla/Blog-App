import styled, { keyframes } from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'
import ReactMarkdown from 'react-markdown'

const {
  color,
  shadow,
  typography: { subheading, heading_sm }
} = DesignSystem

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

interface StyleProps {
  isActive: boolean
}

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

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 20rem;
  max-width: 81rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  border: 1px solid #6e8098;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  resize: vertical;
  visibility: ${(props: StyleProps) => (props.isActive ? 'hidden' : 'visible')};
`

export const MarkdownContainer = styled(ReactMarkdown)`
  width: 100%;
  height: 100%;
  flex: 1;
  border-radius: 0.5rem;
  border: 1px solid #6e8098;
  padding: 1rem;
  color: ${({ theme }) => theme.text.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: ${(props: StyleProps) => (props.isActive ? 'visible' : 'hidden')};
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
  & > ul {
    margin-left: 2rem;
  }
`

export const MarkdownWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 81rem;
  min-height: 20rem;
  position: relative;
  ${flex('flex-start', 'flex-start', 'column')};
  & > svg {
    position: absolute;
    top: 1rem;
    right: 2.1rem;
  }
`

export const NoTagMessage = styled.span`
  font-size: 1.3rem;
  ${heading_sm()};
  color: #6e8098;
`

export const ButtonContainer = styled.div`
  width: auto;
  height: auto;
`

export const MarkdownButtonContainer = styled(ButtonContainer)`
  ${flex()};
  position: absolute;
  top: 1rem;
  right: 2.1rem;
  z-index: 5;
`

export const ButtonWrapper = styled.div`
  width: 12rem;
  height: 2rem;
  background: #e9e9e9;
  margin-right: 1rem;
  border-radius: 0.3rem;
  ${flex()};
  position: relative;
  box-shadow: ${shadow.sm};
`

export const BaseButton = styled.button`
  width: 100%;
  height: 2rem;
  font-size: 9px;
  color: #909090;
  ${flex()};
  ${heading_sm()};
  font-weight: 400;
  background-color: transparent;
  border: none;
  outline: none;
  user-select: none;
  cursor: pointer;
`

export const WriteButton = styled(BaseButton)``
export const PreviewButton = styled(BaseButton)``

export const AnimatedSlider = styled.span`
  width: 50%;
  height: 2rem;
  background-color: ${color.neon.blue};
  position: absolute;
  top: 0;
  left: 0;
  ${flex()};
  ${heading_sm()};
  font-size: 9px;
  color: ${color.secondary.white};
  transform: ${(props: StyleProps) => (props.isActive ? 'translateX(100%)' : 'translateX(0%)')};
  border-top-left-radius: ${(props: StyleProps) => (props.isActive ? '0' : '0.3rem')};
  border-bottom-left-radius: ${(props: StyleProps) => (props.isActive ? '0' : '0.3rem')};
  border-top-right-radius: ${(props: StyleProps) => (props.isActive ? '0.3rem' : '0')};
  border-bottom-right-radius: ${(props: StyleProps) => (props.isActive ? '0.3rem' : '0')};
  transition: transform 0.2s ease-in-out;
  box-shadow: ${shadow.sm};
`

export const ActiveText = styled.span`
  animation: ${fadeIn} 0.3s ease-in-out forwards;
`
