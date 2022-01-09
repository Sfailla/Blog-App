import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input, AppTitle } from '../../styles/shared'
import { SubmitButton } from '../../components/buttons'
import { ToastNotification } from '../../components'
import { useFormValidation } from '../../hooks'
import { useAuthContext } from '../../context/auth-context'
import { validateSignin } from './validation'
import { Container, ButtonContainer, ContentWrapper, ErrorContainer, FormContainer } from './style'

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    validateSignin,
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
          <AppTitle>Sign In</AppTitle>
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
