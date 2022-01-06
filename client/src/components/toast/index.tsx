import { useState, ReactElement } from 'react'
import { Container, IconSection, Body, Title, Message, ButtonContainer } from './style'
import { ToastVariant, ToastTheme } from '../../types/shared'
import { SuccessIcon, ErrorIcon, InfoIcon, WarningIcon, CloseIcon } from '../../assets/svg'

interface Props {
  variant: ToastVariant
  message: string
  theme?: ToastTheme
  title?: string
}

type ReactElementOrNull = ReactElement | null

export default function ToastNotification({
  variant,
  theme = 'dark',
  title,
  message
}: Props): ReactElementOrNull {
  const [open, setOpen] = useState<boolean>(true)

  return open ? (
    <Container role="alert" aria-live="assertive" variant={variant} theme={theme}>
      <IconSection variant={variant}>
        {variant === 'success' && <SuccessIcon width={40} height={40} />}
        {variant === 'error' && <ErrorIcon width={40} height={40} />}
        {variant === 'info' && <InfoIcon width={40} height={40} />}
        {variant === 'warning' && <WarningIcon width={40} height={40} />}
      </IconSection>
      <Body theme={theme}>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Body>
      <ButtonContainer>
        <CloseIcon role="button" onClick={() => setOpen(false)} width={30} height={30} />
      </ButtonContainer>
    </Container>
  ) : null
}
