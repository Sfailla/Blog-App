import { Tag } from './shared'

export type FieldValues = Record<string, any>

export type ValidationErrors = FieldValues & {
  error?: string
}
export interface CreateArticleFields extends FieldValues {
  tags: Tag[]
}

export type Validate = (values: FieldValues) => ValidationErrors

export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement
