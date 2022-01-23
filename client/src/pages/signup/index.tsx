import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input, AppTitle } from '../../styles/shared'
import { useAuth } from '../../context/useAuth'
import { useFormValidation } from '../../hooks'
import { validateSignup } from './validation'
import { SubmitButton } from '../../components/buttons'
import { InputFieldError } from '../../components'
import { Container, ButtonContainer, ContentWrapper, FormContainer } from './style'

const initialValues = {
  username: '',
  email: '',
  password: ''
}

export default function Signup(): ReactElement {
  const { values, formErrors, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    validateSignup,
    submit
  )

  const { register } = useAuth()

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
                value={values.password}
                placeholder="enter password..."
              />
              {formErrors.password && <InputFieldError errorMessage={formErrors.password} />}
            </FormGroup>
            <ButtonContainer>
              <SubmitButton type="submit">Sign Up</SubmitButton>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
