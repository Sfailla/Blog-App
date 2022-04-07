import { render, userEvent } from '../test/test-utils'
import ToastNotification from '../components/toast'
import { mockArticle, mockUser } from '../test/data/mockData'

// mock out articleContext
jest.mock('../context/articleContext', () => ({
  __esModule: true,
  useArticleContext: jest.fn(() => mockArticle),
  ArticleProvider: ({ children }: { children: React.ReactNode }) => children
}))

// mock authContext
jest.mock('../context/authContext', () => ({
  __esModule: true,
  useAuthContext: jest.fn(() => mockUser),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children
}))

describe('toast notification unit tests', () => {
  const message: string = 'test message'

  test('Toast should display and close correctly', async () => {
    const { getByText, getByRole, queryByText } = await render(
      <ToastNotification variant="success" message={message} />
    )
    expect(getByText(message)).toBeInTheDocument()
    userEvent.click(getByRole('button'))
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  test('should change color depending on variant', async () => {
    const { rerender, container } = await render(
      <ToastNotification variant="success" message={message} />
    )
    expect(container.firstChild).toHaveStyle('border-color: #47d764')

    rerender(<ToastNotification variant="error" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #dc3545')

    rerender(<ToastNotification variant="info" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #2f86eb')

    rerender(<ToastNotification variant="warning" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #ffc021')
  })
})
