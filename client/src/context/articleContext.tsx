import { createContext, useContext, useMemo, ReactElement, ReactNode } from 'react'
import { Article, Tag, CreateArticle } from '../types/shared'
import { useArticles } from '../pages/hooks'

interface Props {
  children: ReactNode
}

interface ArticleContextValues {
  tags: Tag[]
  articles: Article[]
  userArticles: Article[]
  createArticle: (article: CreateArticle) => void
  loadingArticles: boolean
  articleError: string
}

const ArticleContext = createContext<ArticleContextValues | null>(null)
ArticleContext.displayName = 'ArticleContext'

export function useArticleContext(): ArticleContextValues {
  const context = useContext(ArticleContext)
  if (context === undefined || context === null) {
    throw new Error(`useArticleContext must be used within a ArticleContextProvider`)
  }
  return context
}

export function ArticleProvider(props: Props): ReactElement {
  const {
    tags,
    articles,
    userArticles,
    createArticle,
    loading: loadingArticles,
    error: articleError
  } = useArticles()

  const contextValues = useMemo(
    () => ({
      tags,
      articles,
      userArticles,
      createArticle,
      loadingArticles,
      articleError
    }),
    [tags, articles, userArticles, createArticle, loadingArticles, articleError]
  ) as ArticleContextValues

  return <ArticleContext.Provider value={contextValues} {...props} />
}
