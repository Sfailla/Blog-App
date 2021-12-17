import { eventFn, buildRegisterForm, TargetFields } from '../../test/helpers'
import { renderHook, act } from '@testing-library/react-hooks'
import useFormValidation from '.'
import { ValidationErrors, FieldValues } from '../../../types/forms'

function testValidation(values: FieldValues): ValidationErrors {
  let error: ValidationErrors = {}
  if (!values.search) {
    error.search = 'search field required'
  }
  return error
}

// simulate the values normally coming from the input
const eventArray: TargetFields[] = [
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
        result.current.handleChange(eventFn(field))
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

    //@ts-ignore
    act(() => result.current.handleSubmit(eventFn()))

    waitFor(() => {
      expect(result.current.isSubmitting).toBeTruthy()
    })

    expect(submitFn).toHaveBeenCalledTimes(1)
    expect(result.current.isSubmitting).toBeFalsy()
  })

  test('should show error if submitted without form values', () => {
    const { result, waitFor } = renderHook(() =>
      useFormValidation({ search: '' }, testValidation, submitFn)
    )

    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBeFalsy()

    // @ts-ignore
    act(() => result.current.handleSubmit(eventFn()))

    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())

    expect(result.current.errors).toEqual({
      search: 'search field required'
    })
    waitFor(() => expect(result.current.isSubmitting).toBeTruthy())
  })
})
