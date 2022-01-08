import { ReactElement } from 'react'
import { SubmitButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import { LayoutWrapper, AppTitle, FormGroup, Label, Input, TextArea } from '../../styles/shared'
import { Container, MainContent, Form, ButtonContainer } from './style'

// interface Props {}

const initialValues = {
  title: '',
  description: '',
  body: '',
  tags: ''
}

export default function CreateArticlePage(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    () => ({}),
    () => {}
  )

  console.log({ values })

  return (
    <Container>
      <LayoutWrapper>
        <MainContent>
          <AppTitle>Create an Article</AppTitle>
          <Form onSubmit={handleSubmit} role="form" aria-label="create-article-form">
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Article title"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Article description"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="body">Description</Label>
              <TextArea
                id="body"
                name="body"
                value={values.body}
                onChange={handleChange}
                placeholder="Enter article"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                placeholder="Add tag for article"
              />
            </FormGroup>
            <ButtonContainer>
              <SubmitButton aria-label="submit-button" type="button">
                Submit
              </SubmitButton>
            </ButtonContainer>
          </Form>
        </MainContent>
      </LayoutWrapper>
    </Container>
  )
}
