import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitButton, AddTagButton, DeleteTagButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import { validateArticle } from './validation'
import { CloseIcon } from '../../assets/svg'
import { LayoutWrapper, PageTitle, FormGroup, Label, Input, TextArea } from '../../styles/shared'
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
import { useTags } from '../hooks'

interface Props {
  createArticle: (articleFields: CreateArticleFields) => void
}

export default function CreateArticlePage({ createArticle }: Props): ReactElement {
  const { tagList, tagName, handleTagChange, addTag, removeTag } = useTags()
  const navigate = useNavigate()
  const { values, handleChange, handleSubmit } = useFormValidation(
    { title: '', description: '', body: '' },
    validateArticle,
    submitForm
  )

  function submitForm(): void {
    const articleFields: CreateArticleFields = {
      ...values,
      tags: tagList
    }
    createArticle(articleFields)
    navigate('/')
  }

  return (
    <Container>
      <LayoutWrapper>
        <MainContent>
          <PageTitle role="heading" aria-level={1}>
            Create an Article
          </PageTitle>
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
              <Label htmlFor="tag">Add Article Tags</Label>
              <Wrapper>
                <TagInput
                  id="tag"
                  autoComplete="off"
                  value={tagName}
                  onChange={handleTagChange}
                  placeholder="Add tag for article"
                />
                <AddTagButton
                  aria-label="add-tag-button"
                  type="button"
                  onClick={() => addTag(tagName)}
                >
                  Add
                </AddTagButton>
              </Wrapper>
              <TagListItems role="list">
                {tagList.length > 0 ? (
                  tagList.map((tag, index) => (
                    <Tag role="listitem" key={index}>
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
            <ButtonContainer>
              <SubmitButton aria-label="submit-button" type="submit">
                Submit
              </SubmitButton>
            </ButtonContainer>
          </Form>
        </MainContent>
      </LayoutWrapper>
    </Container>
  )
}
