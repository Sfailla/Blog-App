import { useCallback, useEffect, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Await, Article, Comment } from '../../types/shared'
import { useAxiosInstance } from '../../hooks'
import { endpoints } from '../../axios/constants'

interface UseComments {
  loadingComments: boolean
  commentError: string | null
  comments: Comment[]
  createComment: (comment: { body: string }, article: string) => void
}

export default function useComments(article: Article): UseComments {
  const [loading, setLoading] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string | null>(null)
  const axiosInstance = useAxiosInstance()

  const fetchComments: (articleSlug: string) => Await<void> = useCallback(
    async (articleSlug: string) => {
      setLoading(true)
      try {
        const request: AxiosRequestConfig = {
          url: `${endpoints.articles}/${articleSlug}/comments`,
          method: 'GET'
        }
        const response: AxiosResponse = await axiosInstance(request)
        if (response.data?.error) {
          setError(response.data.error.message)
        } else {
          setComments(response.data.comments)
        }
      } catch (error) {
        const err = error as AxiosError
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [axiosInstance]
  )

  const createComment: (comment: { body: string }, article: string) => void = useCallback(
    async (comment, article) => {
      setLoading(true)
      try {
        const request: AxiosRequestConfig = {
          url: `${endpoints.articles}/${article}/comment`,
          method: 'POST',
          data: comment
        }
        const response: AxiosResponse = await axiosInstance(request)
        if (response.data?.error) {
          setError(response.data.error.message)
        } else {
          setComments(prevComments => [...prevComments, response.data.comment])
        }
      } catch (error) {
        const err = error as AxiosError
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [axiosInstance]
  )

  useEffect(() => {
    let mounted = true

    if (article && mounted) fetchComments(article.slug)

    return () => {
      mounted = false
      setComments([])
      setError(null)
    }
  }, [article, fetchComments])

  return {
    loadingComments: loading,
    commentError: error,
    comments,
    createComment
  }
}
