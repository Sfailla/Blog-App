import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { PageContainer, LayoutWrapper } from '../../styles/shared'
import { ArticlePageCard, CommentSection } from '../../components'

import { useComments } from '../hooks'

export default function ArticleDetails(): ReactElement {
  const {
    state: { article }
  } = useLocation()

  const { comments, createComment } = useComments(article)

  return (
    <PageContainer>
      <LayoutWrapper>
        <ArticlePageCard article={article} />
        <CommentSection article={article} comments={comments} createComment={createComment} />
      </LayoutWrapper>
    </PageContainer>
  )
}
