import { ReactElement, ReactNode, ChangeEvent, createContext, useContext, useMemo } from 'react'
import { useArticles, useTags } from '../pages/hooks'
import { CreateArticleFields } from '../types/forms'
import { Article, ArticleOrUndefined, Tag } from '../types/shared'

interface Props {
  children: ReactNode
  [key: string]: any
}

interface DataContextValues {
  articles: Article[]
  userArticles: ArticleOrUndefined
  createArticle: (articleFields: CreateArticleFields) => void
  tags: Tag[]
  tagList: Tag[]
  tagName: Tag
  handleTagChange: (event: ChangeEvent<HTMLInputElement>) => void
  addTag: (tag: Tag) => void
  removeTag: (index: number) => void
  loading: boolean
}

export const DataContext = createContext({} as DataContextValues)

export function useDataContext() {
  const context = useContext<DataContextValues>(DataContext)
  if (context === undefined) {
    throw new Error(`useDataContext must be used within a DataProvider`)
  }
  return context
}

export function DataProvider(props: Props): ReactElement {
  const { loading, articles, userArticles, createArticle } = useArticles()
  const { tags, tagList, tagName, handleTagChange, addTag, removeTag } = useTags()

  const contextValues: DataContextValues = useMemo(() => {
    return {
      loading,

      articles,
      userArticles,
      createArticle,
      tags,
      tagList,
      tagName,
      handleTagChange,
      addTag,
      removeTag
    }
  }, [
    loading,

    articles,
    userArticles,
    createArticle,
    tags,
    tagList,
    tagName,
    handleTagChange,
    addTag,
    removeTag
  ])

  return <DataContext.Provider value={contextValues} {...props} />
}
