import { render, userEvent } from '../test/test-utils'
import SignIn from '../pages/signin'

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
})
