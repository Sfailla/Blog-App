import {
  AuthFields,
  UserDatabase,
  StoredTestUser,
  TestUser,
  ResponseError
} from '../../types/tests'
// import { randomBytes, pbkdf2Sync } from 'crypto'

const usersKey: string = 'test_users'

let users = {} as UserDatabase

const persist = (): void => window.localStorage.setItem(usersKey, JSON.stringify(users))
const load = () => {
  const data = window.localStorage.getItem(usersKey) as string
  Object.assign(users, JSON.parse(data))
}

// initialize users
try {
  load()
} catch (e) {
  persist()
}

async function authenticate({
  email,
  password
}: AuthFields): Promise<{ user: TestUser; token: string }> {
  const id: string = hash(email)
  const user: StoredTestUser = users[id] || {}
  const hashedPassword = hash(password)
  if (user.hashedPassword === hashedPassword) {
    return { user: sanitizeUser(user), token: id }
  }

  const error: ResponseError = new Error('Invalid username or password')
  error.status = 400
  throw error
}

async function createUser({ username, email, password }: AuthFields): Promise<TestUser> {
  const id: string = hash(email)
  if (users[id]) {
    const error: ResponseError = new Error(`username ${username} already exists`)
    error.status = 400
    throw error
  }

  const hashedPassword = hash(password)
  const user: StoredTestUser = {
    id,
    username,
    hashedPassword,
    email
  }
  users[id] = user
  persist()
  return retrieveUser(id)
}

async function updateUser(userId: string, updates: Partial<StoredTestUser>): Promise<TestUser> {
  validateUser(userId)
  Object.assign(users[userId], updates)
  persist()
  return retrieveUser(userId)
}

async function removeUser(userId: string): Promise<void> {
  validateUser(userId)
  delete users[userId]
  persist()
}

async function retrieveUser(userId: string): Promise<TestUser> {
  validateUser(userId)
  return sanitizeUser(users[userId])
}

function validateUser(userId: string): void {
  if (!users[userId]) {
    const error: ResponseError = new Error(`user with id of: ${userId} does not exist`)
    error.status = 400
    throw error
  }
  load()
}

// function hash(password: string): string {
//   const salt = randomBytes(16).toString('hex')
//   const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
//   return `${salt}$${hash}`
// }

function hash(str: string): string {
  let hash: number = 5381
  let i: number = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

function sanitizeUser(user: StoredTestUser): TestUser {
  const { hashedPassword, ...rest } = user
  return rest
}

async function resetDatabase(): Promise<void> {
  users = {}
  await persist()
}

export { authenticate, createUser, updateUser, removeUser, retrieveUser, resetDatabase }
