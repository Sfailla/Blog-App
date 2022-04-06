import { rest } from 'msw'
import articles from './data/articles.json'
import tags from './data/tags.json'
import * as UsersDB from './data/users'
import { baseUrl, endpoints } from '../axios/constants'
import {
  TestUser,
  Tag,
  RegisterBody,
  RegisterResponse,
  LoginBody,
  LoginResponse,
  Article,
  AuthCredentials
} from '../types/tests'
import { Profile } from '../types/shared'

const localStorageKey = '__auth_provider_token__'

async function getUserFromToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey)
}

async function handleUserResponse(user: TestUser) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user))
  return user
}

export const handlers = [
  rest.get<Article[]>(`${baseUrl}${endpoints.articles}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json({ articles }))
  }),

  rest.get<Tag[]>(`${baseUrl}${endpoints.tags}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(tags))
  }),

  rest.get<Article[]>(`${baseUrl}${endpoints.articles}/user-articles`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json({ articles }))
  }),

  rest.post<RegisterBody, RegisterResponse>(
    `${baseUrl}${endpoints.auth}/register`,
    async (req, res, ctx) => {
      const { username, email, password } = req.body
      let user
      try {
        user = await UsersDB.createUser({ username, email, password })
        await handleUserResponse(user)
        await UsersDB.createUserProfile({ email })
      } catch (error: Error | any) {
        return res(ctx.status(400), ctx.delay(1500), ctx.json({ error }))
      }
      return res(ctx.status(200), ctx.delay(1500), ctx.json({ user }))
    }
  ),

  rest.post<LoginBody, LoginResponse>(
    `${baseUrl}${endpoints.auth}/login`,
    async (req, res, ctx) => {
      const { email, password } = req.body
      let user: TestUser
      try {
        user = await UsersDB.authenticate({ email, password })
        await handleUserResponse(user)
      } catch (error: Error | any) {
        return res(ctx.status(400), ctx.json({ error }))
      }
      return res(ctx.status(200), ctx.delay(1500), ctx.json({ user }))
    }
  ),

  rest.get<Profile>(`${baseUrl}${endpoints.profiles}/:email`, async (req, res, ctx) => {
    const { email } = req.params
    let profile: Profile
    try {
      profile = await UsersDB.authenticateUserProfile(email as string)
    } catch (error: Error | any) {
      return res(ctx.status(400), ctx.json({ error }))
    }
    return res(ctx.status(200), ctx.delay(1500), ctx.json({ profile }))
  }),

  rest.get<AuthCredentials>(`${baseUrl}${endpoints.auth}/refresh-tokens`, async (req, res, ctx) => {
    const token: string = 'test-access-token'
    const refreshToken: string = 'test-refresh-token'
    const user = JSON.parse((await getUserFromToken()) as string)
    if (!user) {
      return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }))
    }
    return res(ctx.status(200), ctx.delay(1500), ctx.json({ token, refreshToken, user }))
  })
]
