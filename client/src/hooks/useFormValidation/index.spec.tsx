import { FormEvent, ChangeEvent, KeyboardEvent } from 'react'
import { ValidationErrors, FieldValues, InputOrTextarea } from '../../types/forms'
import { changeEvent, buildRegisterForm, CustomEventFields } from '../../test/helpers'
import { renderHook, act } from '@testing-library/react-hooks'
import useFormValidation from '.'

type KeyboardAndChangeEvent = KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>

function testValidation(values: FieldValues): ValidationErrors {
  let error: ValidationErrors = {}
  if (!values.email) error.email = 'email field required'
  if (!values.password) error.password = 'password field required'
  return error
}

// simulate the values normally coming from the input
const loginFields: CustomEventFields[] = [
  { name: 'email', value: 'test@test.com' },
  { name: 'password', value: '1234' }
]

describe('useFormValidation tests', () => {
  const submitFn = Object.assign(jest.fn(), { preventDefault: () => {} })
  const validateFn = () => ({})
  const initialState = { email: '', password: '' }

  test('should accept initial-values', async () => {
    const { result } = renderHook(() => useFormValidation(initialState, validateFn, submitFn))
    expect(result.current.values).toEqual(initialState)
  })

  test('handleChange fn should update form values correctly', async () => {
    const { result } = renderHook(() => useFormValidation(initialState, validateFn, submitFn))

    act(() => {
      // simulate event object and pass input values to onChange handler
      loginFields.forEach(({ name, value }) => {
        result.current.handleChange(changeEvent({ name, value }) as ChangeEvent<InputOrTextarea>)
      })
    })

    expect(result.current.values).toEqual({
      email: 'test@test.com',
      password: '1234'
    })
  })

  test('should update isSubmitting state when form is submitted without errors', () => {
    const registerFields = buildRegisterForm()
    const { result, waitFor } = renderHook(() =>
      useFormValidation(registerFields, validateFn, submitFn)
    )

    expect(result.current.isSubmitting).toBeFalsy()

    act(() => result.current.handleSubmit(submitFn as unknown as FormEvent<HTMLFormElement>))

    waitFor(() => {
      expect(result.current.isSubmitting).toBeTruthy()
    })

    expect(submitFn).toHaveBeenCalledTimes(1)
    expect(result.current.isSubmitting).toBeFalsy()
  })

  test('should show error if submitted without form values', () => {
    const { result, waitFor } = renderHook(() =>
      useFormValidation({ password: '' }, testValidation, submitFn)
    )

    expect(result.current.formErrors).toEqual({})
    expect(result.current.isSubmitting).toBeFalsy()

    act(() => result.current.handleSubmit(submitFn as unknown as FormEvent<HTMLFormElement>))

    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())

    expect(result.current.formErrors).toEqual({
      email: 'email field required',
      password: 'password field required'
    })
    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())
  })

  test('handleResetFormErrors should correctly reset formError object', () => {
    const { result } = renderHook(() =>
      useFormValidation({ email: '', password: '' }, testValidation, submitFn)
    )

    act(() => result.current.handleSubmit(submitFn as unknown as FormEvent<HTMLFormElement>))

    expect(submitFn).not.toHaveBeenCalled()
    expect(result.current.formErrors).toEqual({
      email: 'email field required',
      password: 'password field required'
    })

    act(() =>
      result.current.handleResetFormErrors(
        changeEvent({
          name: 'email',
          value: 'test@test.com'
        }) as unknown as KeyboardAndChangeEvent
      )
    )

    expect(result.current.formErrors).toEqual({
      password: 'password field required'
    })

    act(() =>
      result.current.handleResetFormErrors(
        changeEvent({
          name: 'password',
          value: '1234'
        }) as unknown as KeyboardAndChangeEvent
      )
    )

    expect(result.current.formErrors).toEqual({})
  })
})
