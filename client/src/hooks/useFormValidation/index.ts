import React, { FormEvent, ChangeEvent, useEffect } from 'react'
import { FieldValues, Validate, OptionalFieldValues } from '../../../types/forms'

interface UseFormValidation {
  values: FieldValues
  errors: OptionalFieldValues
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function useFormValidation(
  initialValues: FieldValues,
  validate: Validate,
  authenticate: () => void
): UseFormValidation {
  const [values, setValues] = React.useState<FieldValues>(initialValues)
  const [errors, setErrors] = React.useState<OptionalFieldValues>({})
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist()
    setValues(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const errors: OptionalFieldValues = validate(values)
    setErrors(errors)
    setIsSubmitting(true)
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  }
}
