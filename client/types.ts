///// TYPES /////

type Author = {
  name?: null
  bio?: null
  image?: null
  username: string
  id: string
}

export type Article = {
  id: string
  author: Author
  slug: string
  title: string
  description: string
  body: string
  image?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
  favoritedCount?: number
}

export type NonNullProperties<Type> = {
  [Key in keyof Type]-?: Exclude<Type[Key], null | undefined>
}

export type Await<Type> = Type extends Promise<infer Value> ? Await<Value> : Type
