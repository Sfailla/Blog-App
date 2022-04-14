import { ReactElement } from 'react'
import { Article, Comment, Profile } from '../../types/shared'
import { useAuthContext } from '../../context/authContext'
import { PostCommentButton } from '../../components/buttons'
import { Avatar } from '../'
import {
  Container,
  Title,
  Form,
  FormGroup,
  TextArea,
  Divider,
  GridContainer,
  Wrapper,
  Author,
  FeedContainer,
  CommentContainer,
  CommentBody,
  CommentLayoutWrapper
} from './style'
import { useFormValidation } from '../../hooks'

interface Props {
  comments: Comment[]
  article: Article
  createComment: (comment: { body: string }, article: string) => void
}

interface PostCommentProps {
  profile: Profile
  article: Article
  createComment: (comment: { body: string }, article: string) => void
}

export default function ArticleComments({ article, comments, createComment }: Props): ReactElement {
  const { user, profile } = useAuthContext()

  console.log({ comments })

  return (
    <Container>
      <Divider />
      <Title>Comment section</Title>
      <CommentLayoutWrapper>
        {user && profile && (
          <CommentPostSection profile={profile} article={article} createComment={createComment} />
        )}
        <CommentFeed comments={comments} />
      </CommentLayoutWrapper>
    </Container>
  )
}

function CommentPostSection({ profile, article, createComment }: PostCommentProps): ReactElement {
  const noop = () => ({})
  const initialValues = { comment: '' }
  const { values, handleChange, handleSubmit } = useFormValidation(initialValues, noop, submitFn, {
    resetFormValuesOnSubmit: true
  })

  function submitFn() {
    console.log({ comment: values.comment, article: article.slug })
    createComment({ body: values.comment }, article.slug)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <GridContainer>
          <Avatar user={profile} />
          <Wrapper>
            <TextArea
              name="comment"
              onChange={handleChange}
              value={values.comment}
              placeholder="Write a comment..."
            />
            <PostCommentButton type="submit">Post</PostCommentButton>
          </Wrapper>
        </GridContainer>
      </FormGroup>
    </Form>
  )
}

function CommentFeed({ comments }: { comments: Comment[] }): ReactElement {
  return (
    <FeedContainer>
      {comments.map((comment, index) => (
        <ArticleComment key={index} comment={comment} />
      ))}
    </FeedContainer>
  )
}

function ArticleComment({ comment }: { comment: Comment }): ReactElement {
  return (
    <CommentContainer>
      <GridContainer>
        <Avatar user={comment.author} />
        <Wrapper>
          <Author>{comment.author.username}</Author>
          <CommentBody>{comment.body}</CommentBody>
        </Wrapper>
      </GridContainer>
    </CommentContainer>
  )
}
