import React, { ReactElement } from 'react'
import { Container, ContentWrapper, Wrapper, VerticalDivider, Title } from './style'
import { Navigation, Toggle } from '../../components'

export default function Navbar(): ReactElement {
  return (
    <Container>
      <Wrapper>
        <Title>OTR</Title>
        <ContentWrapper>
          <Toggle />
          <VerticalDivider />
          <Navigation />
        </ContentWrapper>
      </Wrapper>
    </Container>
  )
}
