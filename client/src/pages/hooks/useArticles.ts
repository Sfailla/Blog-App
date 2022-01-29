import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Article, ArticleError, ArticleOrError, TryCatchError } from '../../types/shared'
import { axiosInstance } from '../../axios'
import { endpoints } from '../../axios/constants'
import { useAuthContext } from '../../context/authContext'
import { CreateArticleFields } from '../../types/forms'

interface UseArticles {
  loading: boolean
  articles: Article[]
  userArticles: Article[]
  createArticle: (articleFields: CreateArticleFields) => void
  error: string
}

export default function useArticles(): UseArticles {
  const [loading, setLoading] = useState<boolean>(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [userArticles, setUserArticles] = useState<Article[]>([])
  const [error, setError] = useState<string>('')
  const { user } = useAuthContext()

  const fetchArticles: () => void = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.articles}`,
        method: 'GET'
      }
      const response: AxiosResponse<ArticleOrError> = await axiosInstance(request)
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

  const fetchUserArticles: () => void = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.articles}/user-articles`,
        method: 'GET'
      }
      const response: AxiosResponse<ArticleOrError> = await axiosInstance(request)
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

  const createArticle: (articleFields: CreateArticleFields) => Promise<void> = useCallback(
    async (articleFields: CreateArticleFields) => {
      try {
        setLoading(true)
        const request: AxiosRequestConfig = {
          url: `${endpoints.articles}`,
          method: 'POST',
          data: articleFields
        }
        const response: AxiosResponse<ArticleOrError> = await axiosInstance(request)

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
    articles,
    userArticles,
    createArticle
  }
}
