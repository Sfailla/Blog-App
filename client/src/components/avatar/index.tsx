import { ReactElement } from 'react'
import { UserFields } from '../../../types/shared'
import { Container, AvatarLogo, AvatarName } from './style'

interface Props {
  user: UserFields
}

export default function Avatar({ user }: Props): ReactElement {
  console.log(user)
  return (
    <Container>
      <AvatarLogo></AvatarLogo>
      <AvatarName>{user.username}</AvatarName>
    </Container>
  )
}
