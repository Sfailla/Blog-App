import { TestFields, PartialTestFields } from '../types/tests'

export interface CustomEventFields {
  name: string
  value: string
}

export interface CustomEvent {
  target: CustomEventFields
}

/**
 * Testing utility function to simulate a change event
 *
 * @param fields optional fields to replicate what would be passed into an input element
 * @returns a custom event object that can be used to simulate an input event
 */

export function changeEvent({ name, value }: CustomEventFields): CustomEvent {
  return {
    target: { name, value }
  }
}

/**
 * Testing utility function to simulate a registration form submission
 *
 * @returns an object of form fields similar to what would be obtained from a register form
 */

export function buildRegisterForm(): TestFields {
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

export function buildLoginForm(): PartialTestFields {
  return {
    email: 'test@test.com',
    password: '1234'
  }
}
