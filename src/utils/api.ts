import type { Blog, BlogList } from "@/types/blog"

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

export const getBlogs = async (): Promise<BlogList[]> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published`)
  const blogs: BlogList[] = await response.json()

  return blogs
}

export const getBlogsByTag = async (tag: string): Promise<BlogList[]> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/tag/${tag}`)
  const blogs: BlogList[] = await response.json()

  return blogs
}

export const getBlog = async (slug: string): Promise<Blog> => {
  const response: Response = await fetch(`${devnudgeApiUrl}/blogs/published/${slug}`)
  const blog: Blog = await response.json()

  return blog
}
