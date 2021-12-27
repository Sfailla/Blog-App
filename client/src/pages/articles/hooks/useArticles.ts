import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Article, Tag } from '../../../../types/shared'
import { axiosInstance } from '../../../axios'
import { endpoints } from '../../../axios/constants'

export default function useArticles(): {
  articles: Article[]
  tags: Tag[]
  loading: boolean
  // articleError: string | null
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // const [error, setError] = useState<string | null>(null)

  const fetchArticles: () => void = useCallback(async () => {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.articles}`,
      method: 'GET'
    }
    const response: AxiosResponse<{ articles: Article[] }> = await axiosInstance(request)
    setArticles(response.data.articles)
    setLoading(false)
  }, [])

  const fetchTags: () => void = useCallback(async () => {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.tags}`,
      method: 'GET'
    }
    const response: AxiosResponse<{ tags: Tag[] }> = await axiosInstance(request)
    setTags(response.data.tags)
    setLoading(false)
  }, [])

  useEffect(() => {
    let active = true

    if (active) {
      fetchTags()
      fetchArticles()
    }
    return () => {
      active = false
      setArticles([])
      setTags([])
    }
  }, [fetchTags, fetchArticles])

  return { articles, tags, loading }
}
