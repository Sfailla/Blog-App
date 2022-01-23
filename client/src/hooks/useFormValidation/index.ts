import React, { FormEvent, ChangeEvent, useEffect } from 'react'
import { FieldValues, Validate, ValidationErrors, InputOrTextarea } from '../../types/forms'

interface UseFormValidation {
  values: FieldValues
  formErrors: ValidationErrors
  isSubmitting: boolean
  handleChange: (event: ChangeEvent<InputOrTextarea>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function useFormValidation(
  initialValues: FieldValues,
  validate: Validate,
  authenticate: () => void
): UseFormValidation {
  const [values, setValues] = React.useState<FieldValues>(initialValues)
  const [errors, setErrors] = React.useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors: boolean = Object.keys(errors).length === 0
      if (noErrors) {
        authenticate()
      }
      setIsSubmitting(false)
    }
  }, [values, errors, isSubmitting, authenticate])

  function handleChange(event: ChangeEvent<InputOrTextarea>): void {
    event.persist()
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

  return {
    values,
    formErrors: errors,
    isSubmitting,
    handleChange,
    handleSubmit
  }
}
