export type Blog = BlogItem & { content: string }

export type BlogItem = {
  title: string,
  slug: string
  status: string
  tags: string[]
  published_at: string | null
  created_at: string
}

export type PaginatedBlogList = {
  data: BlogItem[];
  meta: {
    current_page: number,
    last_page: number,
    total: number
  }
}

export type Tag = {
  name: string,
  total_blogs: number,
  total_pages: number
}
