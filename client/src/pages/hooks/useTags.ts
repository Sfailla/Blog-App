import { ChangeEvent, useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { TagList } from '../../types/shared'
import { axiosInstance } from '../../axios'
import { endpoints } from '../../axios/constants'

// interface Tag {
//   id: string
//   name: string
// }

interface UseTags {
  tagList: TagList[]
  tagName: string
  tags: TagList[]
  loading: boolean
  addTag: (name: string) => void
  removeTag: (id: string) => void
  handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function useTags(): UseTags {
  const [tagList, setTagList] = useState<TagList[]>([])
  const [tagName, setTagName] = useState<string>('')
  const [tags, setTags] = useState<TagList[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value)
  }

  const fetchTags: () => void = useCallback(async () => {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.tags}`,
      method: 'GET'
    }
    const response: AxiosResponse<{ tags: TagList[] }> = await axiosInstance(request)
    setTags(response.data.tags)
    setLoading(false)
  }, [])

  const addTag = (name: string): void => {
    const tag = { id: uuidv4(), name }
    setTagList(prevState => [...prevState, tag])
    setTagName('')
  }

  const removeTag = (id: string): void =>
    setTagList(prevState => prevState.filter(tag => id !== tag.id))

  useEffect(() => fetchTags(), [fetchTags])

  return {
    tagList,
    tagName,
    tags,
    loading,
    addTag,
    removeTag,
    handleTagChange
  }
}
