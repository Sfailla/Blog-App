import { ReactElement } from 'react'
import { LayoutWrapper, FormGroup, Label, Input } from '../../styles/shared'
import { useAuth } from '../../context/useAuth'
import { useFormValidation } from '../../hooks'
import { validateSignup } from './validation'
import { SubmitButton } from '../../components/buttons'
import { Container, ButtonContainer, ContentWrapper, Title, FormContainer } from './style'

const initialValues = {
  username: '',
  email: '',
  password: ''
}

export default function Signup(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    validateSignup,
    submit
  )

  const { register } = useAuth()

  function submit(): void {
    console.log('form submitted', { values })
    register(values)
  }

  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <Title>Sign Up</Title>
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
