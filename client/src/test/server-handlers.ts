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

export const handlers = [
  rest.get<Article[]>(`${baseUrl}${endpoints.articles}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json({ articles }))
  }),
  rest.get<Tag[]>(`${baseUrl}${endpoints.tags}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(tags))
  }),
  rest.post<RegisterBody, RegisterResponse>(
    `${baseUrl}${endpoints.auth}/register`,
    async (req, res, ctx) => {
      const { username, email, password } = req.body
      const user = await UsersDB.createUser({ username, email, password })
      return res(
        ctx.cookie('x-auth-token', user.id),
        ctx.status(200),
        ctx.delay(500),
        ctx.json({ user })
      )
    }
  ),
  rest.post<LoginBody, LoginResponse>(
    `${baseUrl}${endpoints.auth}/login`,
    async (req, res, ctx) => {
      const { email, password } = req.body
      const user = await UsersDB.authenticate({ email, password })
      return res(ctx.status(200), ctx.delay(500), ctx.json({ user }))
    }
  ),
  rest.get<AuthCredentials>(`${baseUrl}${endpoints.auth}/refresh-tokens`, async (req, res, ctx) => {
    const token = await getToken(req)
    const user = await getUser(req)

    console.log({ token, user })
    return res(ctx.status(200), ctx.delay(500), ctx.json({ token, user }))
  })
]

const getToken = (req: any) => req.cookies['x-auth-token']
// const getRefreshToken = (req: any) => req.headers.get('x-refresh-token')

const getUser = async (req: any) => {
  const userId = await getToken(req)
  const user = await UsersDB.retrieveUser(userId)
  return user
}
