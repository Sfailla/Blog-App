import { createContext, useContext, useMemo, ReactElement } from 'react'
import { useArticles } from '../pages/hooks'

interface Props {
  children: ReactElement
}

interface ArticleContextValues {}

const ArticleContext = createContext({})

export function useArticleContext() {
  const context = useContext(ArticleContext)
  if (context === undefined) {
    throw new Error(`useArticleContext must be used within a ArticleContextProvider`)
  }
  return context
}

export function ArticleProvider(props: Props): ReactElement {
  const { articles, userArticles, loading: loadingArticle, error: articleError } = useArticles()

  const contextValues = useMemo(
    () => ({ articles, userArticles, loadingArticle, articleError }),
    [articles, userArticles, loadingArticle, articleError]
  )

  return <ArticleContext.Provider value={contextValues} {...props} />
}
