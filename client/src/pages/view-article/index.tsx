import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { ArticleTitle } from './style'
import { PageContainer, LayoutWrapper } from '../../styles/shared'

// interface Props {}

export default function ArticleDetails(): ReactElement {
  const { state } = useLocation()
  console.log(state)

  return (
    <PageContainer>
      <LayoutWrapper>
        <ArticleTitle role="heading" aria-level={1}>
          Article Details
        </ArticleTitle>
      </LayoutWrapper>
    </PageContainer>
  )
}
