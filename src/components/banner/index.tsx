import React from 'react'
import { Container, ToggleContainer, TextWrapper, Title, Subtitle } from './style'
import { Toggle } from '../../components'

function Banner() {
  return (
    <Container>
      <ToggleContainer>
        <Toggle />
      </ToggleContainer>
      <TextWrapper>
        <Title>On Record</Title>
        <Subtitle>A collection of thoughts and information</Subtitle>
      </TextWrapper>
    </Container>
  )
}

export default Banner
