import type { Blog, BlogItem, PaginatedBlogList, Tag } from "@/types/blog"

const hyperUrl: string = import.meta.env.PROD ? import.meta.env.HYPER_URL : import.meta.env.PUBLIC_HYPER_URL

export const getSlugs = async (): Promise<string[]> => {
  const response: Response = await fetch(`${hyperUrl}/blogs/slugs`)
  const slugs: string[] = await response.json()

  return slugs
}

export const getTags = async (): Promise<Tag[]> => {
  const response: Response = await fetch(`${hyperUrl}/tags`)
  const tags: Tag[] = await response.json()

  return tags
}

export const getTotalPages = async (): Promise<number> => {
  const response: Response = await fetch(`${hyperUrl}/blogs/total-pages`)
  const data: { [total_pages: string]: number } = await response.json()

  return data.total_pages
}

export const getBlogs = async (page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await fetch(`${hyperUrl}/blogs?page=${page}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlogsByTag = async (tag: string, page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await fetch(`${hyperUrl}/blogs/tag/${tag}?page=${page}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlog = async (slug: string): Promise<Blog> => {
  const response: Response = await fetch(`${hyperUrl}/blogs/${slug}`)
  const blog: Blog = await response.json()

  return blog
}

export const getLatest = async (): Promise<BlogItem[]> => {
  const response: Response = await fetch(`${hyperUrl}/blogs/latest`)
  const blogs: BlogItem[] = await response.json()

  return blogs
}
