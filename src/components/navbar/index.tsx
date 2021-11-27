import React from 'react'
import { Container, Wrapper, Title } from './style'
import { Navigation } from '../../components'

function Navbar(): React.ReactElement {
  return (
    <Container>
      <Wrapper>
        <Title>Blog</Title>
        <Navigation />
      </Wrapper>
    </Container>
  )
}

export default Navbar
