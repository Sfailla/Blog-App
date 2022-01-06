import { OptionalFieldValues, ValidationErrors } from '../../types/forms'

export function validateSignup(values: OptionalFieldValues): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!values.username) {
    errors.username = 'username is required'
  }

  if (!values.email) {
    errors.email = 'email is Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'password is required'
  }

  return errors
}
