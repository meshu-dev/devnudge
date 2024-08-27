import type { Blog, BlogItem, PaginatedBlogList } from "@/types/blog"

const devnudgeApiUrl: string = import.meta.env.PROD ? import.meta.env.DEVNUDGE_API_URL : import.meta.env.PUBLIC_DEVNUDGE_API_URL

export const getSlugs = async (): Promise<string[]> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/slugs`)
  const slugs: string[] = await response.json()

  return slugs
}

export const getTags = async (): Promise<string[]> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/tags`)
  const tags: string[] = await response.json()

  return tags
}

export const getTotalPages = async (): Promise<number> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/total-pages`)
  const data: { [total_pages: string]: number } = await response.json()

  return data.total_pages
}

export const getBlogs = async (page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published?page=${page}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlogsByTag = async (tag: string): Promise<PaginatedBlogList> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/tag/${tag}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlog = async (slug: string): Promise<Blog> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/${slug}`)
  const blog: Blog = await response.json()

  return blog
}
