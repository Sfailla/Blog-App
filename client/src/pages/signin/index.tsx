import { ReactElement } from 'react'
import { LayoutWrapper } from '../../styles/shared'
import { RegisterButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import {
  Container,
  ButtonContainer,
  ContentWrapper,
  Title,
  FormContainer,
  FormGroup,
  Label,
  Input
} from './style'
import { useAuthContext } from '../../context/auth-context'

// interface Props {}

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    // validateSignup,
    () => ({}),
    submit
  )

  const { login } = useAuthContext()

  function submit(): void {
    console.log('form submitted', { values })
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
              <RegisterButton type="submit">Sign In</RegisterButton>
            </ButtonContainer>
          </FormContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
