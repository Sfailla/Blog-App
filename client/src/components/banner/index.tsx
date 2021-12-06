import React, { ReactElement } from 'react'
import { Container, TextWrapper, Title, Subtitle } from './style'

function Banner(): ReactElement {
  return (
    <Container>
      <TextWrapper>
        <Title>On Record</Title>
        <Subtitle>A collection of thoughts and information</Subtitle>
      </TextWrapper>
    </Container>
  )
}

export default Banner
