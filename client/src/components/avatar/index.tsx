import { ReactElement } from 'react'
import { Container, AvatarLogo, AvatarName } from './style'

interface Props {
  username: string | undefined
}

export default function Avatar({ username }: Props): ReactElement {
  return (
    <Container>
      <AvatarLogo />
      <AvatarName>{username}</AvatarName>
    </Container>
  )
}
