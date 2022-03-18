import styled, { keyframes } from 'styled-components/macro'

const RippleAnimation = keyframes`
  to {
    transform: scale(8);
    opacity: 0;
  }
`

export const Span = styled.span`
  animation: ${RippleAnimation} 0.7s linear;
  opacity: 0.6;
  background-color: white;
`
