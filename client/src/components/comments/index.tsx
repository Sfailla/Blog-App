import { ReactElement } from 'react'
import { Comment } from '../../types/shared'
import { useAuthContext } from '../../context/authContext'
import { PostCommentButton } from '../../components/buttons'
import {
  Container,
  Title,
  Form,
  FormGroup,
  TextArea,
  Divider,
  GridContainer,
  Wrapper,
  Avatar,
  Author,
  FeedContainer,
  CommentContainer,
  CommentBody,
  CommentLayoutWrapper
} from './style'

interface Props {
  comments: Comment[]
}

export default function ArticleComments({ comments }: Props): ReactElement {
  const { user, profile } = useAuthContext()

  return (
    <Container>
      <Divider />
      <Title>Comment section</Title>
      <CommentLayoutWrapper>
        {user && profile && <CommentPostSection avatar={profile!.avatar} />}
        <CommentFeed comments={comments} />
      </CommentLayoutWrapper>
    </Container>
  )
}

function CommentPostSection({ avatar }: { avatar: string | undefined }): ReactElement {
  return (
    <Form>
      <FormGroup>
        <GridContainer>
          <Avatar src={avatar} />
          <Wrapper>
            <TextArea name="comment" placeholder="Write a comment..." />
            <PostCommentButton>Post</PostCommentButton>
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
        <Avatar />
        <Wrapper>
          <Author>{comment.author.username}</Author>
          <CommentBody>{comment.body}</CommentBody>
        </Wrapper>
      </GridContainer>
    </CommentContainer>
  )
}
