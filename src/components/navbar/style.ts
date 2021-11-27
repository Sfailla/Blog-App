import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'

export const Container = styled.div`
  width: 100%;
  height: 5.6rem;
  padding: 0.5rem 1.6rem;
  ${flex()};
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 114rem;
  ${flex('space-between', 'center')};
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`
