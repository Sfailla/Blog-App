import { ReactElement } from 'react'
import { SubmitButton, AddTagButton, DeleteTagButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import { validateArticle } from './validation'
import { CloseIcon } from '../../assets/svg'
import { useTags, useArticles } from '../hooks'
import { LayoutWrapper, AppTitle, FormGroup, Label, Input, TextArea } from '../../styles/shared'
import {
  Container,
  MainContent,
  Form,
  Wrapper,
  TagInput,
  TagListItems,
  NoTagMessage,
  Tag,
  ButtonContainer
} from './style'
import { CreateArticleFields } from '../../types/forms'
import { useDataContext } from '../../context/dataContext'

const initialValues = {
  title: '',
  description: '',
  body: ''
}

export default function CreateArticlePage(): ReactElement {
  const { values, handleChange, handleSubmit } = useFormValidation(
    initialValues,
    validateArticle,
    submitForm
  )

  const { tagList, tagName, handleTagChange, addTag, removeTag, createArticle } = useDataContext()

  function submitForm(): void {
    const articleFields: CreateArticleFields = {
      ...values,
      tags: tagList
    }
    console.log({ articleFields })
    createArticle(articleFields)
  }

  return (
    <Container>
      <LayoutWrapper>
        <MainContent>
          <AppTitle>Create an Article</AppTitle>
          <Form onSubmit={handleSubmit} role="form" aria-label="create-article-form">
            <FormGroup>
              <Label htmlFor="title">Article Title</Label>
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
              <Label htmlFor="description">Article Description</Label>
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
              <Label htmlFor="body">Article Body</Label>
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
              <Label htmlFor="tag">Article Tags</Label>
              <Wrapper>
                <TagInput
                  id="tag"
                  autoComplete="off"
                  value={tagName}
                  onChange={handleTagChange}
                  placeholder="Add tag for article"
                />
                <AddTagButton type="button" onClick={() => addTag(tagName)}>
                  Add
                </AddTagButton>
              </Wrapper>
              <TagListItems>
                {tagList.length > 0 ? (
                  tagList.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                      <DeleteTagButton onClick={() => removeTag(index)}>
                        <CloseIcon width={20} height={20} />
                      </DeleteTagButton>
                    </Tag>
                  ))
                ) : (
                  <NoTagMessage>No tags added</NoTagMessage>
                )}
              </TagListItems>
            </FormGroup>
            <ButtonContainer></ButtonContainer>
          </Form>
          <SubmitButton aria-label="submit-button" type="submit">
            Submit
          </SubmitButton>
        </MainContent>
      </LayoutWrapper>
    </Container>
  )
}
