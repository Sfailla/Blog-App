import { render, waitFor } from '../test/test-utils'
import App from './'
import { setupServer } from 'msw/node'
import { handlers } from '../test/server-handlers'

setupServer(...handlers)

// Establish API mocking before all tests.
// beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
// afterAll(() => server.close())

describe('app component tests', () => {
  test('renders app component with articles and tags', async () => {
    const { getByText, queryByText } = render(<App />)

    waitFor(() => {
      const article = queryByText(/Learn to ski/i)
      expect(article).toBeInTheDocument()
    })

    // await waitForElementToBeRemoved(() => getByText(/no articles found.../i))
    waitFor(() => {
      const tag = queryByText(/E SPORTS/i)
      expect(tag).toBeInTheDocument()
    })
  })
})
