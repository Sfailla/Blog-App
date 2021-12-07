import React, { useEffect, useCallback, useState } from 'react'
import { Article } from '../../../../types'

export default function useArticles(): {
  articles: Article[]
  loading: boolean
  articleError: string | null
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles: () => void = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/articles')
      const data = await response.json()
      console.log(data)
      setArticles(data.articles)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => fetchArticles(), [fetchArticles])

  return { articles, loading, articleError: error }
}
