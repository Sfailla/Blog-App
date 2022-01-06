import styled, { keyframes } from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'
import { ToastVariant, ToastTheme } from '../../types/shared'

const { color } = DesignSystem

const slideUp = keyframes`
  0% { transform: translateY(41px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`

export const Container = styled.div<{ variant: ToastVariant; theme: ToastTheme }>`
  width: 100%;
  height: 6rem;
  overflow: hidden;
  background-color: ${props => (props.theme === 'light' ? '#ffffff' : '#323232')};
  border-radius: 3px;
  padding-right: 1rem;
  ${flex('flex-start')};
  border-left: 5px solid;
  border-color: ${props =>
    props.variant === 'success'
      ? color.notifications.success
      : props.variant === 'error'
      ? color.notifications.error
      : props.variant === 'info'
      ? color.notifications.info
      : color.notifications.warning};
  animation: ${slideUp} 0.4s ease-in forwards;
`

export const IconSection = styled.div<{ variant: ToastVariant }>`
  width: 7.5rem;
  ${flex()};

  & > svg path {
    fill: ${props =>
      props.variant === 'success'
        ? color.notifications.success
        : props.variant === 'error'
        ? color.notifications.error
        : props.variant === 'info'
        ? color.notifications.info
        : color.notifications.warning};
  }
`

export const Body = styled.div<{ theme: ToastTheme }>`
  width: 100%;
  height: 100%;
  ${flex('center', 'flex-start', 'column')};
  color: ${props => (props.theme === 'light' ? color.primary.darkblue : color.secondary.white)};
  padding: 0.5rem;
  padding-left: 0;
`

export const Title = styled.h3`
  display: block;
`

export const Message = styled.p``

export const ButtonContainer = styled.div`
  width: 3rem;
  height: 100%;
  ${flex('center')};

  & > svg {
    cursor: pointer;
    color: grey;
  }
`
