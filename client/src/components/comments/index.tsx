import { ReactElement } from 'react'
import { Comment } from '../../types/shared'
import { useAuthContext } from '../../context/authContext'
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
  comments: Comment[]
}

export default function ArticleComments({ comments }: Props): ReactElement {
  return (
    <Container>
      <Title>Comments section</Title>
      <Divider />
      <CommentPostSection />
    </Container>
  )
}

function CommentPostSection(): ReactElement {
  const { user } = useAuthContext()

  return (
    <Form>
      <FormGroup>
        <GridContainer>
          <Avatar />
          <Wrapper>
            <Author>{user && user.username}</Author>
            <TextArea name="comment" placeholder="Write a comment..." />
            <button>post</button>
            {/* <PostCommentButton>Post</PostCommentButton> */}
          </Wrapper>
        </GridContainer>
      </FormGroup>
    </Form>
  )
}
