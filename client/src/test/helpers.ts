import { FieldValues } from '../types/forms'

export interface TargetFields {
  name: string
  value: string
}

export interface TargetForm {
  preventDefault: () => void
  persist: () => void
  target: Partial<TargetFields>
}

export type TargetFieldsOrObject = TargetFields | {}

export type CustomEvent = Partial<TargetForm>

/**
 * Testing utility function to simulate a change event
 *
 * @param fields optional fields to replicate what would be passed into an input element
 * @returns a custom event object that can be used to simulate an input event
 */

export function eventFn(fields: TargetFieldsOrObject = {}): CustomEvent {
  return {
    preventDefault: jest.fn(),
    persist: jest.fn(),
    target: { ...fields }
  }
}

/**
 * Testing utility function to simulate a registration form submission
 *
 * @returns an object of form fields similar to what would be obtained from a register form
 */

export function buildRegisterForm(): FieldValues {
  return {
    username: 'test-user',
    email: 'test@test.com',
    password: '1234'
  }
}

/**
 * Testing utility function to simulate a login form submission
 *
 * @returns an object of form fields similar to what would be obtained from a login form
 */

export function buildLoginForm(): FieldValues {
  return {
    email: 'test@test.com',
    password: '1234'
  }
}
