import { useEffect, useState } from 'react'
import { Article } from '../../../../types'

export default function useArticles(): {
  articles: Article[]
  loading: boolean
  articleError: string | null
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles: () => Promise<void> = async () => {
    setLoading(true)
    try {
      const response = await fetch('/articles')
      const data = await response.json()
      console.log(data)
      setArticles(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return { articles, loading, articleError: error }
}
