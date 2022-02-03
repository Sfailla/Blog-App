import { ReactElement } from 'react'
import { Container } from './style'
import { ReactComponent as AnimatedSpinner } from '../../../assets/svg/loaders/spinner.svg'

export default function FullPageSpinner(): ReactElement {
  return (
    <Container role="status">
      <AnimatedSpinner aria-label="loading" width={100} height={100} />
    </Container>
  )
}
