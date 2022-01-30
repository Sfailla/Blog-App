///// SHARED INTERFACES & TYPES /////

export interface Author {
  name: null
  bio: null
  image: null
  username: string
  id: string
}

export type Tag = string

export interface Article {
  id: string
  author: Partial<Author>
  slug: string
  title: string
  description: string
  body: string
  image: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
  favoritedCount?: number
}

export interface ServerError {
  status: number
  name: string
  message: string
  stack: string
}

export type ResponseError = Pick<ServerError, 'message'>

export type ArticleError = string

export type ArticleOrUndefined = Article[] | undefined
export interface ArticleOrError {
  article: Article
  articles: Article[]
  error: ResponseError
}

export interface TagsOrError {
  tags: Tag[]
  error: ResponseError
}

export type TryCatchError = any & Error

export type User = UserFields | null

export interface UserFields {
  id: string
  username: string
  email: string
  role: string
}

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'
export type ToastTheme = 'dark' | 'light'

export type Mode = 'light' | 'dark'

export type RestProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>

export type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

export type Await<Type> = Type extends Promise<infer Value> ? Await<Value> : Type
