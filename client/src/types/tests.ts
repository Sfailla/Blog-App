export interface StoredTestUser {
  id: string
  username?: string
  hashedPassword: string
  email: string
  role: string
}

export type TestUser = Omit<StoredTestUser, 'hashedPassword'>

export interface UserDatabase {
  [id: string]: StoredTestUser
}

export interface ResponseError extends Error {
  status?: number
}

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  [index: string]: string
}

export interface RegisterBody extends LoginBody {
  username: string
}

export interface RegisterResponse extends LoginResponse {}

export interface AuthCredentials {
  user: TestUser
  refreshToken: string
  token: string
}

export interface AuthFields {
  username?: string
  email: string
  password: string
}

export interface Article {
  id: string
  author: {
    id: string
    name: null
    bio: null
    image: null
    username: string
  }
  image: null
  tags: string[]
  favoriteCount: number
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  slug: string
}

export type Tag = string
