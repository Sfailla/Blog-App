import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Article, Tag } from '../../../../types/shared'
import { axiosInstance } from '../../../axios'
import { endpoints } from '../../../axios/constants'
import { useAuthContext } from '../../../context/auth-context'

export default function useArticles(): {
  articles: Article[]
  userArticles: Article[]
  tags: Tag[]
  loading: boolean
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [userArticles, setUserArticles] = useState<Article[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { user } = useAuthContext()

  const fetchArticles: () => void = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.articles}`,
        method: 'GET'
      }
      const response: AxiosResponse<{ articles: Article[] }> = await axiosInstance(request)
      setArticles(response.data.articles)
      setLoading(false)
    } catch (error) {
      console.error(error)
      throw new Error('error fetching articles')
    } finally {
      setLoading(false)
    }
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

  const fetchUserArticles: () => void = useCallback(async () => {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.articles}/user/articles`,
      method: 'GET'
    }
    const response: AxiosResponse<{ articles: Article[] }> = await axiosInstance(request)
    setUserArticles(response.data.articles)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      fetchUserArticles()
    }
  }, [fetchUserArticles, user])

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

  return {
    articles,
    userArticles,
    tags,
    loading
  }
}
