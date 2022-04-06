// TOGGLE COMPONENT IMPORTS
import { render, userEvent } from '../test/test-utils'
import Toggle from '../components/toggle/index'

// mock out articleContext
jest.mock('../context/articleContext', () => ({
  __esModule: true,
  useArticleContext: jest.fn(() => ({
    tags: [],
    articles: [],
    userArticles: [],
    createArticle: jest.fn(),
    loadingArticles: false,
    articleError: ''
  })),
  ArticleProvider: ({ children }: { children: React.ReactNode }) => children
}))

// mock authContext
jest.mock('../context/authContext', () => ({
  __esModule: true,
  useAuthContext: jest.fn(() => ({
    user: {
      username: '',
      email: '',
      password: '',
      role: '',
      error: '',
      loading: false,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn()
    }
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children
}))

describe('Toggle', () => {
  test('toggle triggers light/dark mode colors', async () => {
    const { getByRole, getByLabelText } = await render(<Toggle />)

    const toggleButton = getByRole('button')
    const sunIcon = getByLabelText('sun-icon-label').querySelector('svg')!
    const moonIcon = getByLabelText('moon-icon-label').querySelector('svg')!
    const toggle = () => userEvent.click(toggleButton)

    expect(sunIcon.getAttribute('fill')).toBe('gold')
    expect(moonIcon.getAttribute('fill')).toBe('#b8b8b8')

    toggle()

    expect(sunIcon.getAttribute('fill')).toBe('white')
    expect(moonIcon.getAttribute('fill')).toBe('gold')

    toggle()

    expect(sunIcon.getAttribute('fill')).toBe('gold')
    expect(moonIcon.getAttribute('fill')).toBe('#b8b8b8')
  })
})
