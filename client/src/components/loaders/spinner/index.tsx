import { ReactElement } from 'react'
import { Container } from './style'
import { ReactComponent as AnimatedSpinner } from '../../../assets/svg/loaders/spinner.svg'

// interface Props {}

export default function FullPageSpinner(): ReactElement {
  return (
    <Container>
      <AnimatedSpinner width={100} height={100} />
    </Container>
  )
}
