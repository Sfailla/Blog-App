import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Article } from '../../types/shared'
import { axiosInstance } from '../../axios'
import { endpoints } from '../../axios/constants'
import { useAuthContext } from '../../context/authContext'
import { CreateArticleFields } from '../../types/forms'

export default function useArticles(): {
  loading: boolean
  articles: Article[]
  userArticles: Article[]
  createArticle: (articleFields: CreateArticleFields) => void
} {
  const [articles, setArticles] = useState<Article[]>([])
  const [userArticles, setUserArticles] = useState<Article[]>([])
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

  const fetchUserArticles: () => void = useCallback(async () => {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.articles}/user-articles`,
      method: 'GET'
    }
    const response: AxiosResponse<{ articles: Article[] }> = await axiosInstance(request)
    setUserArticles(response.data.articles)
    setLoading(false)
  }, [])

  const createArticle: (articleFields: CreateArticleFields) => void = useCallback(
    async (articleFields: CreateArticleFields) => {
      try {
        setLoading(true)
        const request: AxiosRequestConfig = {
          url: `${endpoints.articles}`,
          method: 'POST',
          data: articleFields
        }
        const response: AxiosResponse<{ article: Article }> = await axiosInstance(request)
        console.log({ response })

        if (response.status === 200) {
          setArticles([response.data.article, ...articles])
          setUserArticles([response.data.article, ...userArticles])
        }
      } catch (error) {
        console.error(error)
        throw new Error('error creating article')
      } finally {
        setLoading(false)
      }
    },
    [articles, userArticles]
  )

  useEffect(() => {
    if (user) {
      fetchUserArticles()
    }
  }, [fetchUserArticles, user])

  useEffect(() => {
    let active = true

    if (active) {
      fetchArticles()
    }
    return () => {
      active = false
      setArticles([])
    }
  }, [fetchArticles, fetchUserArticles, user])

  return {
    loading,
    articles,
    userArticles,
    createArticle
  }
}
