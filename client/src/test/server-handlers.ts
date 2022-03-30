import { rest } from 'msw'
import articles from './data/articles.json'
import tags from './data/tags.json'
import * as UsersDB from './data/users'
import { baseUrl, endpoints } from '../axios/constants'
import {
  Tag,
  RegisterBody,
  RegisterResponse,
  LoginBody,
  LoginResponse,
  Article,
  AuthCredentials
} from '../types/tests'
import { Profile } from '../types/shared'

export const handlers = [
  rest.get<Article[]>(`${baseUrl}${endpoints.articles}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json({ articles }))
  }),

  rest.get<Tag[]>(`${baseUrl}${endpoints.tags}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(tags))
  }),

  rest.get<Article[]>(`${baseUrl}${endpoints.articles}/user-articles`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json({ articles }))
  }),

  rest.post<RegisterBody, RegisterResponse>(
    `${baseUrl}${endpoints.auth}/register`,
    async (req, res, ctx) => {
      const { username, email, password } = req.body
      let user
      try {
        user = await UsersDB.createUser({ username, email, password })
        await UsersDB.createUserProfile({ email })
      } catch (error: Error | any) {
        return res(ctx.status(400), ctx.json({ error }))
      }
      return res(ctx.status(200), ctx.json({ user }))
    }
  ),

  rest.get<Profile>(`${baseUrl}${endpoints.profiles}/:username`, async (req, res, ctx) => {
    const { username } = req.params
    let profile
    try {
      profile = await UsersDB.retrieveUserProfile(username as string)
    } catch (error: Error | any) {
      return res(ctx.status(400), ctx.json({ error }))
    }
    return res(ctx.status(200), ctx.json(profile))
  }),

  rest.post<LoginBody, LoginResponse>(
    `${baseUrl}${endpoints.auth}/login`,
    async (req, res, ctx) => {
      const { email, password } = req.body
      let user
      try {
        user = await UsersDB.authenticate({ email, password })
        await UsersDB.createUserProfile({ email })
      } catch (error: Error | any) {
        return res(ctx.status(400), ctx.json({ error }))
      }
      return res(ctx.status(200), ctx.delay(500), ctx.json(user))
    }
  ),

  rest.get<AuthCredentials>(`${baseUrl}${endpoints.auth}/refresh-tokens`, async (req, res, ctx) => {
    const token: string = 'test-access-token'
    const refreshToken: string = 'test-refresh-token'
    const user = { id: 'test-id', username: 'testUser', email: 'testUser@gmail.com', role: 'user' }
    return res(ctx.status(200), ctx.json({ token, refreshToken, user }))
  })
]
