import { ChangeEvent, useState } from 'react'
import { Tag } from '../../types/shared'

interface UseTags {
  tagList: Tag[]
  tagName: Tag
  addTag: (tagName: Tag) => void
  removeTag: (index: number) => void
  handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function useTags(): UseTags {
  const [tagList, setTagList] = useState<Tag[]>([])
  const [tagName, setTagName] = useState<Tag>('')

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value)
  }

  const addTag = (tagName: string): void => {
    setTagList(prevState => [...prevState, tagName])
    setTagName('')
  }

  const removeTag = (index: number): void =>
    setTagList(prevState => prevState.filter((_, tagIndex) => index !== tagIndex))

  return {
    tagList,
    tagName,
    addTag,
    removeTag,
    handleTagChange
  }
}
