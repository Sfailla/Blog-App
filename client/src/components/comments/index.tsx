import { ReactElement } from 'react'
import { Comment, User } from '../../types/shared'
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
  CommentBody
} from './style'

interface Props {
  comments: Comment[]
}

export default function ArticleComments({ comments }: Props): ReactElement {
  const { profile } = useAuthContext()
  return (
    <Container>
      <Divider />
      <Title>Comment section</Title>
      <CommentPostSection avatar={profile!.avatar} />
      <CommentFeed comments={comments} />
    </Container>
  )
}

function CommentPostSection({ avatar }: { avatar: string }): ReactElement {
  return (
    <Form>
      <FormGroup>
        <GridContainer>
          <Avatar />
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
          <Author>{comment.author}</Author>
          <CommentBody>{comment.body}</CommentBody>
        </Wrapper>
      </GridContainer>
    </CommentContainer>
  )
}
