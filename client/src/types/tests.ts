export interface StoredTestUser {
  id: string
  username: string
  hashedPassword: string
  email: string
  role: string
}

export type TestUser = Omit<StoredTestUser, 'hashedPassword'>

export interface UserDatabase {
  [id: string]: StoredTestUser
}

export interface ProfileDatabase {
  [id: string]: TestProfile
}

export interface ResponseError extends Error {
  status?: number
  message: string
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

export interface ProfileBody extends RegisterBody {
  email: string
}
export interface ProfileResponse extends LoginResponse {}

export interface AuthCredentials {
  user: TestUser
  refreshToken: string
  token: string
}

export type TestFields = Pick<TestUser, 'username' | 'email'> & { password: string }
export type PartialTestFields = Omit<TestFields, 'username'>

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

export interface TestProfile {
  id: string
  username: string
  bio: string
  avatar: string
  fullname: string
  isFollowing: boolean
  favorites: string[]
  following: string[]
}
