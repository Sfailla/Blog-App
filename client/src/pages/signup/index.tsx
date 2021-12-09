import React, { ReactElement } from 'react'
import { LayoutWrapper } from '../../styles/shared'
import { Container, ContentWrapper, Title, FormContainer, FormGroup, Label, Input } from './style'

// interface Props {}

export default function Signup(): ReactElement {
  return (
    <Container>
      <LayoutWrapper>
        <ContentWrapper>
          <Title>Sign Up</Title>
          <FormContainer>
            <FormGroup>
              <Label>Username</Label>
              <Input type="text" placeholder="enter username..." />
            </FormGroup>
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
