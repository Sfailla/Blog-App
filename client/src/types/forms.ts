import { TagList } from './shared'

export type FieldValues = Record<string, any>

export type ValidationErrors = FieldValues & {
  error?: string
}
export interface CreateArticleFields extends FieldValues {
  tags: string[]
}

export type Validate = (values: FieldValues) => ValidationErrors

export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement
