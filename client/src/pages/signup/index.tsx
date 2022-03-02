import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input, PageTitle } from '../../styles/shared'
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

  const { register, error: authError } = useAuthContext()

  function submit(): void {
    register(values)
  }

  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <PageTitle role="heading" aria-level={1}>
            Sign Up
          </PageTitle>
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                role="textbox"
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
            {authError && <ToastNotification variant="error" message={authError} />}
          </ErrorContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
