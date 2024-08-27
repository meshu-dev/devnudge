export type Blog = BlogList & { content: string }

export type BlogList = {
  title: string,
  slug: string
  status: string
  tags: string[]
  published_at: string | null
  created_at: string
}