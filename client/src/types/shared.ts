///// SHARED INTERFACES & TYPES /////

export type UserFields = User | null

export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface Author {
  avatar: string | null
  username: string
  id: string
}

export interface Profile {
  id: string
  username: string
  fullname: string
  avatar: string
  bio: string
  favorites?: string[]
  following?: string[]
  isFollowing: boolean
  createdAt?: string
  updatedAt?: string
}

export type ExtendedUser = User & Pick<Profile, 'avatar' | 'fullname' | 'bio'>

export type Tag = string

export interface Article {
  id: string
  author: Author
  slug: string
  title: string
  description: string
  body: string
  avatar: string
  tags: Tag[]
  isFavorite?: boolean
  favoritedCount?: number
  createdAt: string
  updatedAt: string
}

export type CreateArticle = Partial<Article>

export interface Comment {
  id: string
  author: Author
  body: string
  article: string
  createdAt: string
  updatedAt: string
}

export interface ServerError {
  status: number
  name: string
  message: string
  stack: string
}

export type ResponseError = Pick<ServerError, 'message' | 'status'>

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
