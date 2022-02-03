import { render, userEvent, waitFor, waitForElementToBeRemoved } from '../test/test-utils'
import * as UsersDB from '../test/data/users'
import Signup from '../pages/signup'

afterEach(async () => await UsersDB.resetDatabase())

describe('Signup component tests', () => {
  test('register form displays error message if fields are empty', () => {
    const { getByText, getByRole } = render(<Signup />)
    const submitButton = getByRole('button', { name: /sign up/i })

    userEvent.click(submitButton)

    expect(getByText(/email is required/i)).toBeInTheDocument()
    expect(getByText(/password is required/i)).toBeInTheDocument()
    expect(getByText(/username is required/i)).toBeInTheDocument()
  })

  test('register component should create and return an authenticated user', async () => {
    const { getByRole, queryByRole, getByText, debug } = render(<Signup />)

    const submitButton = getByRole('button', { name: /sign up/i })

    const usernameInput = getByRole('textbox', { name: /username/i })
    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    userEvent.type(usernameInput, 'testUser')
    userEvent.type(emailInput, 'testUser@gmail.com')
    userEvent.type(passwordInput, '1234')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByRole('status')).toBeInTheDocument()
      debug()
    })

    debug()
    await waitForElementToBeRemoved(() => queryByRole('status'))

    // await waitFor(() => {
    //   expect(queryByRole('alert')).toBeInTheDocument()
    // })

    debug()
  })
})
