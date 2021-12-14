export type FieldValues = Record<string, string>

export type OptionalFieldValues = Partial<Record<keyof FieldValues, string>>

export type Validate = (values: FieldValues) => OptionalFieldValues

export interface ValidationErrors extends OptionalFieldValues {}
