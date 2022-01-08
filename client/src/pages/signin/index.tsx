import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input } from '../../styles/shared'
import { SubmitButton } from '../../components/buttons'
import { ToastNotification } from '../../components'
import { useFormValidation } from '../../hooks'
import {
  Container,
  ButtonContainer,
  ContentWrapper,
  ErrorContainer,
  Title,
  FormContainer
} from './style'
import { useAuthContext } from '../../context/auth-context'

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    () => ({}),
    submit
  )

  const { login, error: authError } = useAuthContext()

  function submit(): void {
    login(values)
  }

  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <Title>Sign In</Title>
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="enter email..."
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="enter password..."
              />
            </FormGroup>
            <ButtonContainer>
              <SubmitButton type="submit">Sign In</SubmitButton>
            </ButtonContainer>
          </FormContainer>
          <ErrorContainer>
            {authError && <ToastNotification variant="error" message={authError} />}
          </ErrorContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
