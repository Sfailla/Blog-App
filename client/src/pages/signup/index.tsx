import React, { ReactElement } from 'react'
import { LayoutWrapper } from '../../styles/shared'
import { Container, ContentWrapper, Title, FormContainer, FormGroup, Label, Input } from './style'

import { useFormValidation } from '../../hooks'
import { validateSignup } from './validation'

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

  function submit(): void {
    console.log('form submitted')
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
          </FormContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
