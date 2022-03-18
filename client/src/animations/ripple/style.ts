import styled, { keyframes } from 'styled-components/macro'

const RippleAnimation = keyframes`
  to {
    transform: scale(8);
    opacity: 0;
  }
`

export const Span = styled.span`
  display: block;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: ${RippleAnimation} 0.7s linear;
  opacity: 0.6;
  background-color: white;
`
