import {
  PartialTestFields,
  UserDatabase,
  ProfileDatabase,
  StoredTestUser,
  TestUser,
  TestFields,
  TestProfile,
  ResponseError
} from '../../types/tests'

const usersKey: string = 'test_users'
const profilesKey: string = 'test_profiles'

let users = {} as UserDatabase
let profiles = {} as ProfileDatabase

const persist = (): void => {
  window.localStorage.setItem(usersKey, JSON.stringify(users))
  window.localStorage.setItem(profilesKey, JSON.stringify(profiles))
}
const load = () => {
  const data = window.localStorage.getItem(usersKey) || '{}'
  const profile = window.localStorage.getItem(profilesKey) || '{}'
  Object.assign(users, JSON.parse(data))
  Object.assign(profiles, JSON.parse(profile))
}

// initialize users
try {
  load()
} catch (e) {
  persist()
}

async function authenticate({ email, password }: PartialTestFields): Promise<TestUser> {
  const id: string = await hash(email)
  const user: StoredTestUser = users[id] || {}
  const hashedPassword = await hash(password)
  if (user.hashedPassword === hashedPassword) {
    return await sanitizeUser(user)
  }

  const error: ResponseError = new Error()
  error.status = 400
  error.message = 'Invalid username or password'
  throw error
}

async function createUserProfile({ email }: { email: string }): Promise<TestProfile> {
  const id: string = await hash(email)
  const user: TestUser = await retrieveUser(id)

  if (profiles[id]) {
    const error: ResponseError = new Error()
    error.status = 400
    error.message = 'Profile already exists'
    throw error
  }

  if (!user) {
    const error: ResponseError = new Error()
    error.status = 400
    error.message = 'User does not exist'
    throw error
  }

  const profile: TestProfile = {
    id,
    username: user.username,
    fullname: '',
    bio: '',
    avatar: '',
    isFollowing: false,
    favorites: [],
    following: []
  }

  profiles[id] = profile
  persist()
  return await retrieveUserProfile(id)
}

async function authenticateUserProfile(email: string): Promise<TestProfile> {
  const id: string = await hash(email)
  const profile = await retrieveUserProfile(id)
  return profile
}

async function retrieveUserProfile(userId: string): Promise<TestProfile> {
  validate({ type: 'PROFILE', userId })
  return profiles[userId]
}

async function createUser({ username, email, password }: TestFields): Promise<TestUser> {
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
  await validate({ type: 'USER', userId })
  Object.assign(users[userId], updates)
  persist()
  return await retrieveUser(userId)
}

async function removeUser(userId: string): Promise<void> {
  await validate({ type: 'USER', userId })
  delete users[userId]
  persist()
}

async function retrieveUser(userId: string): Promise<TestUser> {
  validate({ type: 'USER', userId })
  return await sanitizeUser(users[userId])
}

async function validate({ type, userId }: { type: string; userId: string }): Promise<void> {
  switch (type) {
    case 'USER': {
      if (!users[userId]) {
        const error: ResponseError = new Error()
        error.status = 404
        error.message = 'User not found'
        throw error
      }
      break
    }
    case 'PROFILE': {
      if (!profiles[userId]) {
        const error: ResponseError = new Error()
        error.status = 404
        error.message = 'Profile not found'
        throw error
      }
      break
    }
    default: {
      const error: ResponseError = new Error()
      error.status = 400
      error.message = 'Invalid type'
      throw error
    }
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
  profiles = {}
  persist()
}

export {
  authenticate,
  createUser,
  createUserProfile,
  updateUser,
  removeUser,
  retrieveUser,
  authenticateUserProfile,
  resetDatabase
}
