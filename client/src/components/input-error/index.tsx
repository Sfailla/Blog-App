import { ReactElement } from 'react'
import { Error } from './style'

interface Props {
  errorMessage: string
}

export default function InputFieldError({ errorMessage }: Props): ReactElement {
  return (
    <Error aria-label="input-error" role="alert">
      {errorMessage}
    </Error>
  )
}
