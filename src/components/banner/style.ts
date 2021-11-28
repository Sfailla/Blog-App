import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading, gradientText }
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  height: 17rem;
  background-color: ${({ theme }) => theme.background.secondary};
  box-shadow: inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%);
  ${flex()};
`

export const TextWrapper = styled.div`
  text-align: center;
`

export const Title = styled.h1`
  font-size: 3.5rem;
  ${heading()};
  ${gradientText()};
`

export const Subtitle = styled.h3`
  font-weight: normal;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text.heading};
`
