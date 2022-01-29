import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tag, Article, TryCatchError, Await } from '../../types/shared'
import { axiosInstance } from '../../axios'
import { endpoints } from '../../axios/constants'
import { useAuthContext } from '../../context/authContext'
import { CreateArticleFields } from '../../types/forms'

interface UseArticles {
  loading: boolean
  tags: Tag[]
  articles: Article[]
  userArticles: Article[]
  createArticle: (articleFields: CreateArticleFields) => void
  error: string
}

export default function useArticles(): UseArticles {
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [userArticles, setUserArticles] = useState<Article[]>([])
  const [error, setError] = useState<string>('')
  const { user } = useAuthContext()

  const fetchTags: () => Await<void> = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.tags}`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data?.error) {
        setError(response.data.error.message)
      } else {
        setTags(response.data.tags)
      }
    } catch (error: TryCatchError) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchArticles: () => Await<void> = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.articles}`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data?.error) {
        setError(response.data.error.message)
      } else {
        setArticles(response.data.articles)
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUserArticles: () => Await<void> = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.articles}/user-articles`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data?.error) {
        setError(response.data.error.message)
      } else {
        setUserArticles(response.data.articles)
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createArticle: (articleFields: CreateArticleFields) => Await<void> = useCallback(
    async (articleFields: CreateArticleFields) => {
      try {
        setLoading(true)
        const request: AxiosRequestConfig = {
          url: `${endpoints.articles}`,
          method: 'POST',
          data: articleFields
        }
        const response: AxiosResponse = await axiosInstance(request)

        if (response.status === 200) {
          setArticles([response.data.article, ...articles])
          setUserArticles([response.data.article, ...userArticles])
        }
      } catch (error: TryCatchError) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [articles, userArticles]
  )

  useEffect(() => fetchTags(), [fetchTags])

  useEffect(() => {
    if (user) fetchUserArticles()
  }, [fetchUserArticles, user])

  useEffect(() => {
    let active = true
    if (active) fetchArticles()
    return () => {
      active = false
    }
  }, [fetchArticles])

  return {
    loading,
    error,
    tags,
    articles,
    userArticles,
    createArticle
  }
}
