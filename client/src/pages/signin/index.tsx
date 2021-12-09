import React, { ReactElement } from 'react'
import { LayoutWrapper } from '../../styles/shared'
import { Container, ContentWrapper, Title, FormContainer, FormGroup, Label, Input } from './style'

// interface Props {}

export default function SignIn(): ReactElement {
  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <Title>Sign In</Title>
          <FormContainer>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="enter email..." />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" placeholder="enter password..." />
            </FormGroup>
          </FormContainer>
        </ContentWrapper>
      </LayoutWrapper>
    </Container>
  )
}
