import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { PageContainer, LayoutWrapper } from '../../styles/shared'
import { ArticlePageCard, CommentSection } from '../../components'

import {} from './style'

export default function ArticleDetails(): ReactElement {
  const {
    state: { article }
  } = useLocation()

  return (
    <PageContainer>
      <LayoutWrapper>
        <ArticlePageCard article={article} />
        <CommentSection article={article} />
      </LayoutWrapper>
    </PageContainer>
  )
}
