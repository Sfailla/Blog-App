export type FieldValues = Record<string, string>

export type ValidationErrors = FieldValues & {
  error?: string
}

export type Validate = (values: FieldValues) => ValidationErrors

export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement
