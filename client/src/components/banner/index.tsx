import { ReactElement } from 'react'
import { Container, TextWrapper, Title, Subtitle } from './style'

export default function Banner(): ReactElement {
  return (
    <Container>
      <TextWrapper>
        <Title role="heading" aria-level={1}>
          Off The Record
        </Title>
        <Subtitle>A collection of thoughts and ideas</Subtitle>
      </TextWrapper>
    </Container>
  )
}
