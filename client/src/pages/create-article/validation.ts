import { FieldValues, ValidationErrors } from '../../types/forms'

export function validateArticle(article: FieldValues): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!article.title) {
    errors.title = 'Title is required'
  }

  if (!article.description) {
    errors.description = 'Description is required'
  }

  if (!article.body) {
    errors.body = 'Body is required'
  }

  return errors
}
