import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input, AppTitle } from '../../styles/shared'
import { SubmitButton } from '../../components/buttons'
import { ToastNotification, InputFieldError } from '../../components'
import { useFormValidation } from '../../hooks'
import { useAuthContext } from '../../context/authContext'
import { validateSignin } from './validation'
import { Container, ButtonContainer, ContentWrapper, ErrorContainer, FormContainer } from './style'

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn(): ReactElement {
  const { values, formErrors, handleChange, handleSubmit, handleResetFormErrors } =
    useFormValidation(initialValues, validateSignin, submit)

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
                onKeyDown={handleResetFormErrors}
                placeholder="enter email..."
              />
              {formErrors.email && <InputFieldError errorMessage={formErrors.email} />}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onKeyDown={handleResetFormErrors}
                placeholder="enter password..."
              />
              {formErrors.password && <InputFieldError errorMessage={formErrors.password} />}
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
