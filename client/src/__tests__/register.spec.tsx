import { render, userEvent, waitFor, waitForElementToBeRemoved } from '../test/test-utils'
import * as UsersDB from '../test/data/users'
import Signup from '../pages/signup'

// mocking localstorage to
jest.spyOn(window.localStorage.__proto__, 'setItem')
jest.spyOn(window.localStorage.__proto__, 'getItem')

afterEach(async () => {
  await UsersDB.resetDatabase()
})

afterAll(() => {
  jest.resetAllMocks()
})

describe('Signup component tests', () => {
  test('register form displays error message if fields are empty', () => {
    const { getByText, getByRole } = render(<Signup />)
    const submitButton = getByRole('button', { name: /sign up/i })

    userEvent.click(submitButton)

    expect(getByText(/email is required/i)).toBeInTheDocument()
    expect(getByText(/password is required/i)).toBeInTheDocument()
    expect(getByText(/username is required/i)).toBeInTheDocument()
  })

  test('register component should create user and return to previous ui state', async () => {
    const { getByRole, queryByRole } = render(<Signup />)

    const submitButton = getByRole('button', { name: /sign up/i })
    const usernameInput = getByRole('textbox', { name: /username/i })
    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    userEvent.type(usernameInput, 'testUser')
    userEvent.type(emailInput, 'testUser@gmail.com')
    userEvent.type(passwordInput, '1234')

    userEvent.click(submitButton)

    await waitFor(() => expect(getByRole('status')).toBeInTheDocument())
    await waitFor(() => expect(getByRole('heading', { name: /sign up/i })).toBeInTheDocument())

    expect(usernameInput.textContent).toBe('')
    expect(emailInput.textContent).toBe('')
    expect(passwordInput.textContent).toBe('')

    expect(queryByRole('alert')).not.toBeInTheDocument()
  })

  test('registration with already registered user should render error message', async () => {
    const { getByRole, getByText } = render(<Signup />)

    const submitButton = getByRole('button', { name: /sign up/i })
    const usernameInput = getByRole('textbox', { name: /username/i })
    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    await UsersDB.createUser({
      username: 'testUser',
      email: 'TestUser@gmail.com',
      password: '1234'
    })

    userEvent.type(usernameInput, 'testUser')
    userEvent.type(emailInput, 'TestUser@gmail.com')
    userEvent.type(passwordInput, '1234')

    userEvent.click(submitButton)

    await waitFor(() => expect(getByRole('status')).toBeInTheDocument())
    await waitForElementToBeRemoved(() => getByRole('status'))
    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument())

    expect(getByText(/user already exists/i)).toBeInTheDocument()
  })
})
