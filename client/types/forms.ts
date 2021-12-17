export type FieldValues = Record<string, string>

export type OptionalFieldValues = Partial<Record<string, keyof FieldValues>>

export type ValidationErrors = OptionalFieldValues & {
  error?: string
}

export type Validate = (values: FieldValues) => ValidationErrors
