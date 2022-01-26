import { eventFn, buildRegisterForm, CustomEventFields } from '../../test/helpers'
import { renderHook, act } from '@testing-library/react-hooks'
import useFormValidation from '.'
import { ValidationErrors, FieldValues } from '../../types/forms'

function testValidation(values: FieldValues): ValidationErrors {
  let error: ValidationErrors = {}
  if (!values.email) error.email = 'email field required'
  if (!values.password) error.password = 'password field required'
  return error
}

// simulate the values normally coming from the input
const eventArray: CustomEventFields[] = [
  { name: 'email', value: 'test@test.com' },
  { name: 'password', value: '1234' }
]

describe('useFormValidation tests', () => {
  const submitFn = jest.fn()
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
      eventArray.forEach(field => {
        // @ts-ignore
        result.current.handleChange(eventFn({ name: field.name, value: field.value }))
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

    act(() =>
      result.current.handleSubmit(
        //@ts-ignore
        eventFn({ username: 'test-user', email: 'test@test.com', password: '1234' })
      )
    )

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

    // @ts-ignore
    act(() => result.current.handleSubmit(eventFn({ name: 'password', value: '' })))

    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())

    expect(result.current.formErrors).toEqual({
      email: 'email field required',
      password: 'password field required'
    })
    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())
  })

  test('handleResetFormErrors should work correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({ email: '', password: '' }, testValidation, submitFn)
    )

    // @ts-ignore
    act(() => result.current.handleSubmit(eventFn({ name: 'email', value: '' })))

    expect(result.current.formErrors).toEqual({
      email: 'email field required',
      password: 'password field required'
    })
  })
})
