import React from 'react'
import { Container, ContentWrapper, Wrapper, VerticalDivider, Title } from './style'
import { Navigation, Toggle } from '../../components'

function Navbar(): React.ReactElement {
  return (
    <Container>
      <Wrapper>
        <Title>Blog</Title>
        <ContentWrapper>
          <Toggle />
          <VerticalDivider />
          <Navigation />
        </ContentWrapper>
      </Wrapper>
    </Container>
  )
}

export default Navbar
