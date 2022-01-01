import React, { ReactElement } from 'react'
import { Container, TextWrapper, Title, Subtitle } from './style'

export default function Banner(): ReactElement {
  return (
    <Container>
      <TextWrapper>
        <Title>The Record</Title>
        <Subtitle>A collection of thoughts and information</Subtitle>
      </TextWrapper>
    </Container>
  )
}
