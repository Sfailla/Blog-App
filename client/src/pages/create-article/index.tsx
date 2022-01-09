import { ReactElement } from 'react'
import { SubmitButton, AddTagButton, DeleteTagButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import { validateArticle } from './validation'
import { CloseIcon } from '../../assets/svg'
import { LayoutWrapper, AppTitle, FormGroup, Label, Input, TextArea } from '../../styles/shared'
import {
  Container,
  MainContent,
  Form,
  Wrapper,
  TagInput,
  TagList,
  NoTagMessage,
  Tag,
  ButtonContainer
} from './style'
import { useTags } from '../hooks/useTags'

const initialValues = {
  title: '',
  description: '',
  body: '',
  tag: ''
}

export default function CreateArticlePage(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    validateArticle,
    () => {}
  )

  const { tagList, addTag, removeTag } = useTags()
  console.log({ tagList })

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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                value={values.body}
                onChange={handleChange}
                placeholder="Enter article"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="tag">Tags</Label>
              <Wrapper>
                <TagInput
                  id="tag"
                  name="tag"
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Add tag for article"
                />
                <AddTagButton onClick={() => addTag(values.tag)}>Add</AddTagButton>
              </Wrapper>
              <TagList>
                {tagList.length > 0 ? (
                  tagList.map((tag, index) => (
                    <Tag key={index}>
                      {tag.name}
                      <DeleteTagButton onClick={() => removeTag(tag.id)}>
                        <CloseIcon width={20} height={20} />
                      </DeleteTagButton>
                    </Tag>
                  ))
                ) : (
                  <NoTagMessage>No tags added</NoTagMessage>
                )}
              </TagList>
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
