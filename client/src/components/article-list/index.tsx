import { ReactElement } from 'react'
import { Container } from './style'
import { ArticleCard } from '../../components'
import { Article } from '../../types/shared'

interface Props {
  articles?: Article[] | undefined
}

export default function ArticleList({ articles }: Props): ReactElement {
  return (
    <Container>
      {articles ? (
        articles.map(article => <ArticleCard key={article.id} article={article} />)
      ) : (
        <p>no articles found...</p>
      )}
    </Container>
  )
}
