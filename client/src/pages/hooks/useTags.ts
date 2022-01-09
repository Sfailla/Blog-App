import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Tag {
  id: string
  name: string
}

interface UseTags {
  tagList: Tag[]
  addTag: (name: string) => void
  removeTag: (id: string) => void
}

export function useTags(): UseTags {
  const [tagList, setTagList] = useState<Tag[]>([])

  const addTag = (name: string): void => {
    const tag = { id: uuidv4(), name }
    setTagList(prevState => [...prevState, tag])
  }

  const removeTag = (id: string): void =>
    setTagList(prevState => prevState.filter(tag => id !== tag.id))

  return {
    tagList,
    addTag,
    removeTag
  }
}
