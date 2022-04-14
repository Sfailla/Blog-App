import { ReactElement } from 'react'
import { Container, AvatarLogo, AvatarLetter } from './style'
import { getRandomHexColor } from '../../utils/helperFns'

interface Props {
  user: {
    avatar: string | null
    username: string
  }
}

export default function Avatar({ user }: Props): ReactElement {
  let hexcode

  if (user.avatar === null) hexcode = getRandomHexColor()
  else hexcode = null

  return (
    <Container background={hexcode}>
      {user.avatar ? (
        <AvatarLogo src={user.avatar} />
      ) : (
        <AvatarLetter>{user.username.charAt(0).toUpperCase()}</AvatarLetter>
      )}
    </Container>
  )
}
