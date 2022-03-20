import { useEffect, useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tag, Article, TryCatchError, Await } from '../../types/shared'
import { useAxiosInstance } from '../../hooks/'
import { endpoints } from '../../axios/constants'
import { useAuthContext } from '../../context/authContext'
import { CreateArticleFields } from '../../types/forms'

interface UseArticles {
  loading: boolean
  error: string
  tags: Tag[]
  articles: Article[]
  userArticles: Article[]
  createArticle: (articleFields: CreateArticleFields) => Await<void>
}

export default function useArticles(): UseArticles {
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [userArticles, setUserArticles] = useState<Article[]>([])
  const [error, setError] = useState<string>('')
  const { user } = useAuthContext()
  const axiosInstance = useAxiosInstance()

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
  }, [axiosInstance])

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
  }, [axiosInstance])

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
  }, [axiosInstance])

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
          setArticles(prevState => [response.data.article, ...prevState])
          setUserArticles(prevState => [response.data.article, ...prevState])
          setTags(prevState =>
            [...response.data.article.tags, ...prevState].sort((a, b) => a.localeCompare(b))
          )
        }
      } catch (error: TryCatchError) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [axiosInstance]
  )

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      fetchTags()
    }

    return () => {
      isMounted = false
      setTags([])
    }
  }, [fetchTags])

  useEffect(() => fetchArticles(), [fetchArticles])

  useEffect(() => {
    if (!user) return
    fetchUserArticles()
  }, [fetchUserArticles, user])

  return {
    loading,
    error,
    tags,
    articles,
    userArticles,
    createArticle
  }
}
