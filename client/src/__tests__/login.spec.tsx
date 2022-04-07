import { render, userEvent, waitFor, waitForLoadingToFinish } from '../test/test-utils'
import * as UsersDB from '../test/data/users'
import SignIn from '../pages/signin'
import { mockArticle } from '../test/data/mockData'

// mock out articleContext
jest.mock('../context/articleContext', () => ({
  __esModule: true,
  useArticleContext: jest.fn(() => mockArticle),
  ArticleProvider: ({ children }: { children: React.ReactNode }) => children
}))

afterEach(async () => {
  await UsersDB.resetDatabase()
})

describe('Login component tests', () => {
  test('renders without crashing', () => {
    render(<SignIn />)
  })

  test('login form displays error message if fields are empty', async () => {
    const { getByText, getByRole } = await render(<SignIn />)
    const submitButton = getByRole('button', { name: /sign in/i })

    userEvent.click(submitButton)

    expect(getByText(/email is required/i)).toBeInTheDocument()
    expect(getByText(/password is required/i)).toBeInTheDocument()
  })

  test('login should be successful and return to initial ui state', async () => {
    const { getByRole, queryByRole } = await render(<SignIn />)

    const submitButton = getByRole('button', { name: /sign in/i })

    const emailInput = getByRole('textbox', { name: /email/i })
    const passwordInput = getByRole('textbox', { name: /password/i })

    await UsersDB.createUser({
      username: 'testUser',
      email: 'testUser@gmail.com',
      password: '1234'
    })

    await UsersDB.createUserProfile({
      email: 'testUser@gmail.com'
    })

    userEvent.type(emailInput, 'testUser@gmail.com')
    userEvent.type(passwordInput, '1234')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByRole('textbox', { name: /email/i })).toBeNull()
      expect(queryByRole('textbox', { name: /password/i })).toBeNull()
    })

    await waitForLoadingToFinish()

    expect(emailInput.textContent).toBe('')
    expect(passwordInput.textContent).toBe('')
  })

  test('login with invalid credentials should render error message', async () => {
    const { getByRole, queryByRole, getByText } = await render(<SignIn />)

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

    await waitFor(() => {
      expect(queryByRole('alert')).toBeInTheDocument()
      expect(getByText(/invalid username or password/i)).toBeInTheDocument()
    })

    expect(emailInput.textContent).toBe('')
    expect(passwordInput.textContent).toBe('')
  })
})
