import { render, userEvent, waitFor, waitForElementToBeRemoved } from '../test/test-utils'
import * as UsersDB from '../test/data/users'
import SignIn from '../pages/signin'

// mocking localstorage to reset values after tests
jest.spyOn(window.localStorage.__proto__, 'setItem')
jest.spyOn(window.localStorage.__proto__, 'getItem')

beforeEach(async () => {
  await UsersDB.resetDatabase()
})

afterAll(() => {
  jest.resetAllMocks()
})

describe('Login component tests', () => {
  test('renders without crashing', () => {
    render(<SignIn />)
  })

  test('login form displays error message if fields are empty', () => {
    const { getByText, getByRole } = render(<SignIn />)
    const submitButton = getByRole('button', { name: /sign in/i })

    userEvent.click(submitButton)

    expect(getByText(/email is required/i)).toBeInTheDocument()
    expect(getByText(/password is required/i)).toBeInTheDocument()
  })

  test('login should be successful and return to initial ui state', async () => {
    const { getByRole } = render(<SignIn />)

    const submitButton = getByRole('button', { name: /sign in/i })

    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    await UsersDB.createUser({
      username: 'testUser',
      email: 'testUser@gmail.com',
      password: '1234'
    })

    userEvent.type(emailInput, 'testUser@gmail.com')
    userEvent.type(passwordInput, '1234')

    userEvent.click(submitButton)

    await waitFor(() => expect(getByRole('status')).toBeInTheDocument())
    await waitFor(() => expect(getByRole('heading', { name: /sign in/i })).toBeInTheDocument())

    expect(emailInput.textContent).toBe('')
    expect(passwordInput.textContent).toBe('')
  })

  test('login with invalid credentials should render error message', async () => {
    const { getByRole, getByText, debug } = render(<SignIn />)

    const submitButton = getByRole('button', { name: /sign in/i })

    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    await UsersDB.createUser({
      username: 'testUser',
      email: 'testUser@gmail.com',
      password: '1234'
    })

    userEvent.type(emailInput, 'testUser2@gmail.com')
    userEvent.type(passwordInput, '9989')

    userEvent.click(submitButton)

    await waitFor(() => expect(getByRole('status')).toBeInTheDocument())
    await waitForElementToBeRemoved(() => getByRole('status'))
    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument())

    expect(getByText(/invalid username or password/i)).toBeInTheDocument()
  })
})
