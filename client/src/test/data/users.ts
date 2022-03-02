import {
  AuthFields,
  UserDatabase,
  StoredTestUser,
  TestUser,
  ResponseError
} from '../../types/tests'

const usersKey: string = 'test_users'

let users = {} as UserDatabase

const persist = (): void => window.localStorage.setItem(usersKey, JSON.stringify(users))
const load = () => {
  const data = window.localStorage.getItem(usersKey) || '{}'
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
  const id: string = await hash(email)
  const user: StoredTestUser = users[id] || {}
  const hashedPassword = await hash(password)
  if (user.hashedPassword === hashedPassword) {
    return { user: await sanitizeUser(user), token: id }
  }

  const error: ResponseError = new Error()
  error.status = 400
  error.message = 'Invalid username or password'
  throw error
}

async function createUser({ username, email, password }: AuthFields): Promise<TestUser> {
  const id: string = await hash(email)
  if (users[id]) {
    const error: ResponseError = new Error()
    error.status = 400
    error.message = `user ${username} already exists`
    throw error
  }

  const hashedPassword = await hash(password)
  const user: StoredTestUser = {
    id,
    username,
    hashedPassword,
    email,
    role: 'user'
  }
  users[id] = user
  persist()
  return await retrieveUser(id)
}

async function updateUser(userId: string, updates: Partial<StoredTestUser>): Promise<TestUser> {
  await validateUser(userId)
  Object.assign(users[userId], updates)
  persist()
  return await retrieveUser(userId)
}

async function removeUser(userId: string): Promise<void> {
  await validateUser(userId)
  delete users[userId]
  persist()
}

async function retrieveUser(userId: string): Promise<TestUser> {
  validateUser(userId)
  return await sanitizeUser(users[userId])
}

async function validateUser(userId: string): Promise<void> {
  if (!users[userId]) {
    const error: ResponseError = new Error()
    error.status = 400
    error.message = `user with id of: ${userId} does not exist`
    throw error
  }
  load()
}

async function hash(str: string): Promise<string> {
  let hash: number = 5381
  let i: number = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

async function sanitizeUser(user: StoredTestUser): Promise<TestUser> {
  const { hashedPassword, ...rest } = user
  return rest
}

async function resetDatabase(): Promise<void> {
  users = {}
  persist()
}

export { authenticate, createUser, updateUser, removeUser, retrieveUser, resetDatabase }
