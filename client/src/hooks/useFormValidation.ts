import { FormEvent, ChangeEvent, KeyboardEvent, useState, useEffect } from 'react'
import { FieldValues, Validate, ValidationErrors, InputOrTextarea } from '../types/forms'

interface FormOptions {
  resetFormValuesOnSubmit?: boolean
}

interface UseFormValidation {
  values: FieldValues
  formErrors: ValidationErrors
  isSubmitting: boolean
  handleChange: (event: ChangeEvent<InputOrTextarea>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleResetFormErrors: (
    event: KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>
  ) => void
}

export default function useFormValidation(
  initialValues: FieldValues,
  validate: Validate,
  authenticate: () => void,
  { ...options }: FormOptions = {}
): UseFormValidation {
  const [values, setValues] = useState<FieldValues>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors: boolean = Object.keys(errors).length === 0
      if (noErrors) {
        authenticate()
        if (options.resetFormValuesOnSubmit) {
          setValues(initialValues)
        }
      }
      setIsSubmitting(false)
    }
  }, [values, errors, isSubmitting, authenticate, initialValues, options.resetFormValuesOnSubmit])

  function handleChange(event: ChangeEvent<InputOrTextarea>): void {
    setValues(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const errors: ValidationErrors = validate(values)
    setErrors(errors)
    setIsSubmitting(true)
  }

  function handleResetFormErrors(
    event: KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>
  ): void {
    setErrors(
      Object.keys(errors).reduce((acc, key) => {
        if (key !== event.target.name) {
          acc[key] = errors[key]
        }
        return acc
      }, {} as ValidationErrors)
    )
  }

  return {
    values,
    formErrors: errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleResetFormErrors
  }
}
