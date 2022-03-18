import { useCallback, useEffect, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Await, Article, Comment, TryCatchError } from '../../types/shared'
import { useAxiosInstance } from '../../hooks'
import { endpoints } from '../../axios/constants'

interface UseComments {
  loadingComments: boolean
  commentError: string
  comments: Comment[]
}

export default function useComments(article: Article): UseComments {
  const [loading, setLoading] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string>('')
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
          console.log({ response })
          setComments(response.data.comments)
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
    if (article) fetchComments(article.slug)
  }, [article, fetchComments])

  return {
    loadingComments: loading,
    commentError: error,
    comments
  }
}
