import { useState } from 'react'

export default function useMarkdownPreview() {
  const [markdownPreview, setMarkdownPreview] = useState<boolean>(false)
  const toggleMarkdownPreview = (): void => setMarkdownPreview(prevState => !prevState)

  return {
    markdownPreview,
    toggleMarkdownPreview
  }
}
