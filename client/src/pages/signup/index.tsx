import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input, AppTitle } from '../../styles/shared'
import { useFormValidation } from '../../hooks'
import { validateSignup } from './validation'
import { SubmitButton } from '../../components/buttons'
import { ToastNotification, InputFieldError } from '../../components'
import { Container, ButtonContainer, ErrorContainer, ContentWrapper, FormContainer } from './style'
import { useAuthContext } from '../../context/authContext'

export default function Signup(): ReactElement {
  const initialValues = { username: '', email: '', password: '' }
  const { values, formErrors, handleChange, handleSubmit, handleResetFormErrors } =
    useFormValidation(initialValues, validateSignup, submit)

  const { register, error } = useAuthContext()

  function submit(): void {
    register(values)
  }

  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <AppTitle>Sign Up</AppTitle>
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                onKeyDown={handleResetFormErrors}
                value={values.username}
                placeholder="enter username..."
              />
              {formErrors.username && <InputFieldError errorMessage={formErrors.username} />}
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onKeyDown={handleResetFormErrors}
                value={values.email}
                placeholder="enter email..."
              />
              {formErrors.email && <InputFieldError errorMessage={formErrors.email} />}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onKeyDown={handleResetFormErrors}
                value={values.password}
                placeholder="enter password..."
              />
              {formErrors.password && <InputFieldError errorMessage={formErrors.password} />}
            </FormGroup>
            <ButtonContainer>
              <SubmitButton type="submit">Sign Up</SubmitButton>
            </ButtonContainer>
          </FormContainer>
          <ErrorContainer>
            {error && <ToastNotification variant="error" message={error} />}
          </ErrorContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
