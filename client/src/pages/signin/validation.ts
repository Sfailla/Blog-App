import { FieldValues, ValidationErrors } from '../../types/forms'

export function validateSignin(values: FieldValues): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!values.email) {
    errors.email = 'email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'password is required'
  }

  return errors
}
