import { rest } from 'msw'
import articles from './articles.json'

export const handlers = [
  rest.get('http://localhost:3001/api/v1/articles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json({ articles }))
  }),
  rest.get('http://localhost:3001/api/v1/tags', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        tags: [
          'apex legends',
          'basketball',
          'boat',
          'chainsaw',
          'dance',
          'development',
          'drive',
          'e sports',
          'fun',
          'invest'
        ]
      })
    )
  })
]
