import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitButton, AddTagButton, DeleteTagButton } from '../../components/buttons'
import { useFormValidation } from '../../hooks'
import { validateArticle } from './validation'
import { CloseIcon, MarkdownIcon } from '../../assets/svg'
import { CreateArticleFields } from '../../types/forms'
import { useTags, useMarkdownPreview } from '../hooks'
import { useArticleContext } from '../../context/articleContext'
import {
  LayoutWrapper,
  PageTitle,
  PageContainer,
  FormGroup,
  Label,
  Input
} from '../../styles/shared'
import {
  Tag,
  Form,
  MainContent,
  Wrapper,
  TagInput,
  TextArea,
  TagListItems,
  NoTagMessage,
  ButtonContainer,
  ButtonWrapper,
  MarkdownButtonContainer,
  MarkdownContainer,
  MarkdownWrapper,
  PreviewButton,
  WriteButton,
  AnimatedSlider,
  ActiveText
} from './style'

export default function CreateArticlePage(): ReactElement {
  const { createArticle } = useArticleContext()
  const { tagList, tagName, handleTagChange, addTag, removeTag } = useTags()
  const { values, handleChange, handleSubmit } = useFormValidation(
    { title: '', description: '', body: '' },
    validateArticle,
    submitForm
  )

  const { markdownPreview, toggleMarkdownPreview } = useMarkdownPreview()

  const navigate = useNavigate()

  function submitForm(): void {
    const articleFields: CreateArticleFields = { ...values, tags: tagList }
    createArticle(articleFields)
    navigate('/')
  }

  return (
    <PageContainer>
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
              <Label htmlFor="body">Article</Label>
              <MarkdownWrapper>
                <MarkdownButtonContainer>
                  <MarkdownToggleButton
                    isActive={markdownPreview}
                    toggleMarkdownPreview={toggleMarkdownPreview}
                  />
                  <MarkdownIcon width={25} height={22} fill="#ff0097" />
                </MarkdownButtonContainer>
                <MarkdownContainer isActive={markdownPreview}>{values.body}</MarkdownContainer>
                <TextArea
                  id="body"
                  name="body"
                  autoComplete="off"
                  value={values.body}
                  onChange={handleChange}
                  isActive={markdownPreview}
                  placeholder="compose your article (markdown supported)"
                />
              </MarkdownWrapper>
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
    </PageContainer>
  )
}

interface ToggleProps {
  isActive: boolean
  toggleMarkdownPreview: () => void
}

const MarkdownToggleButton = ({ isActive, toggleMarkdownPreview }: ToggleProps): ReactElement => {
  return (
    <ButtonWrapper>
      <WriteButton onClick={toggleMarkdownPreview}>Write</WriteButton>
      <PreviewButton onClick={toggleMarkdownPreview}>Preview</PreviewButton>
      <AnimatedSlider isActive={isActive}>
        <ActiveText>{isActive ? 'preview' : 'write'}</ActiveText>
      </AnimatedSlider>
    </ButtonWrapper>
  )
}
