import { ReactElement } from 'react'
import { Container, TextWrapper, Title, Subtitle } from './style'

export default function Banner(): ReactElement {
  return (
    <Container>
      <TextWrapper>
        <Title role="heading" aria-level={1}>
          The Record
        </Title>
        <Subtitle>A collection of thoughts and information</Subtitle>
      </TextWrapper>
    </Container>
  )
}
