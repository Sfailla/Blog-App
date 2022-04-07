// MOCK DATA FOR TESTING

import { ReactNode } from 'react'
import { User, Profile, Article, Tag, CreateArticle } from '../../types/shared'

interface ArticleContext {
  tags: Tag[]
  articles: Article[]
  userArticles: Article[]
  createArticle: (article: CreateArticle) => void
  loadingArticles: boolean
  articleError: string
}

interface AuthContext {
  user: User | null
  profile: Profile | null
  register: (user: Partial<User>) => void
  login: (user: Partial<User>) => void
  logout: () => void
  loading: boolean
  error: string
}

export const mockArticle: ArticleContext = {
  tags: [],
  articles: [],
  userArticles: [],
  createArticle: jest.fn(),
  loadingArticles: false,
  articleError: ''
}

export const mockUser: AuthContext = {
  user: null,
  profile: null,
  error: '',
  loading: false,
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn()
}

export const MockProvider = ({ children }: { children: ReactNode }) => children
