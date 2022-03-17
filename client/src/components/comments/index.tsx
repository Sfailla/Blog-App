import { ReactElement } from 'react'
import { Comment } from '../../types/shared'
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
  Author
} from './style'

interface Props {
  comment: Comment
}

export default function ArticleComments({ comment }: Props): ReactElement {
  return (
    <Container>
      <Title>Comments section</Title>
      <Divider />
      <CommentPostSection comment={comment} />
    </Container>
  )
}

function CommentPostSection({ comment }: Props): ReactElement {
  return (
    <Form>
      <FormGroup>
        <GridContainer>
          <Avatar />
          <Wrapper>
            <Author>{comment.author.username}</Author>
            <TextArea name="comment" placeholder="Write a comment..." />
            <button>post</button>
            {/* <PostCommentButton>Post</PostCommentButton> */}
          </Wrapper>
        </GridContainer>
      </FormGroup>
    </Form>
  )
}
