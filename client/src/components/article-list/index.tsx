import { ReactElement } from 'react'
import { Container } from './style'
import { ArticleCard } from '../../components'
import { ArticleOrUndefined } from '../../types/shared'

interface Props {
  articles: ArticleOrUndefined
}

export default function ArticleList({ articles }: Props): ReactElement {
  return (
    <Container>
      {articles && articles.length > 0 ? (
        articles.map(article => {
          return <ArticleCard key={article.id} article={article} />
        })
      ) : (
        <p>no articles found...</p>
      )}
    </Container>
  )
}
