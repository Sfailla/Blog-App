import { render, waitFor } from '../test/test-utils'
import App from './'

describe('app component tests', () => {
  test('renders app component with articles and tags', async () => {
    const { getByText, getAllByText } = render(<App />)

    await waitFor(() => expect(getByText(/Learn to ski/i)).toBeInTheDocument())

    await waitFor(() => expect(getAllByText(/E SPORTS/i)).toHaveLength(2))
  })
})
