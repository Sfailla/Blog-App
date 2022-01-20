///// SHARED INTERFACES & TYPES /////

export interface Author {
  name?: null
  bio?: null
  image?: null
  username: string
  id: string
}

export interface TagList {
  name: string
}

export interface Article {
  id: string
  author: Author
  slug: string
  title: string
  description: string
  body: string
  image: string
  tags: TagList[]
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
  favoritedCount?: number
}

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
