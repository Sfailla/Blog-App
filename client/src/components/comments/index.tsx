import { ReactElement } from 'react'
import { Article } from '../../types/shared'
import Avatar from '../avatar'
import {
  Container,
  Title,
  Form,
  FormGroup,
  TextArea,
  Divider,
  GridContainer,
  Wrapper
} from './style'

interface Props {
  article: Article
}

export default function CommentSection({ article }: Props): ReactElement {
  return (
    <Container>
      <Title>Comments section</Title>
      <Divider />
      <Form>
        <FormGroup>
          <GridContainer>
            <Avatar username={article.author.username} />
            <Wrapper>
              <TextArea name="comment" placeholder="Write a comment..." />
              <button>post</button>
              {/* <PostCommentButton>Post</PostCommentButton> */}
            </Wrapper>
          </GridContainer>
        </FormGroup>
      </Form>
    </Container>
  )
}
