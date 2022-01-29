import { ChangeEvent, useState, useCallback, useEffect } from 'react'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TagsOrError, Tag, TryCatchError, ResponseError } from '../../types/shared'
import { axiosInstance } from '../../axios'
import { endpoints } from '../../axios/constants'

interface UseTags {
  tagList: string[]
  tagName: string
  tags: Tag[]
  error: string
  loading: boolean
  addTag: (tagName: string) => void
  removeTag: (index: number) => void
  handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function useTags(): UseTags {
  const [tagList, setTagList] = useState<Tag[]>([])
  const [tagName, setTagName] = useState<Tag>('')
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value)
  }

  const fetchTags: () => void = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.tags}`,
        method: 'GET'
      }
      const response: AxiosResponse<{ tags: Tag[] }> = await axiosInstance(request)
      console.log({ response })
      // if (response.data?.error) {
      //   setError(response.data.error.message)
      // } else {
      setTags(response.data.tags)
      // }
    } catch (error: TryCatchError) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addTag = (tagName: string): void => {
    setTagList(prevState => [...prevState, tagName])
    setTagName('')
  }

  const removeTag = (index: number): void =>
    setTagList(prevState => prevState.filter((_, tagIndex) => index !== tagIndex))

  useEffect(() => fetchTags(), [fetchTags])

  return {
    tagList,
    tagName,
    tags,
    loading,
    error,
    addTag,
    removeTag,
    handleTagChange
  }
}
