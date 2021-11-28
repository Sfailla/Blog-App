import styled from 'styled-components/macro'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  flex: 1;
`
