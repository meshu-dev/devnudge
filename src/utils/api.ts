import type { Blog, BlogItem, PaginatedBlogList, Tag } from "@/types/blog"

const hyperUrl: string = import.meta.env.PUBLIC_HYPER_URL
const blogUrl: string = `${hyperUrl}/sites/devnudge`

const getToken = async (): Promise<string> => {
  const response: Response = await fetch(
    `${hyperUrl}/auth/login`,
    {
      method: 'POST', 
      headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }),
      body: JSON.stringify({
        "email": import.meta.env.HYPER_EMAIL,
        "password": import.meta.env.HYPER_PASSWORD,
      })
    }
  )
  const data: { [token: string]: string } = await response.json()
  return data.token
}

const authToken: string = await getToken()

const callApi = async (url: string): Promise<Response> => {
  return await fetch(
    url,
    {
      method: 'GET', 
      headers: new Headers({
          'Authorization': `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }),
    }
  )
}

export const getSlugs = async (): Promise<string[]> => {
  const response: Response = await callApi(`${blogUrl}/blogs/slugs`)
  const slugs: string[] = await response.json()

  return slugs
}

export const getTags = async (): Promise<Tag[]> => {
  const response: Response = await callApi(`${blogUrl}/tags`)
  const tags: Tag[] = await response.json()

  return tags
}

export const getTotalPages = async (): Promise<number> => {
  const response: Response = await callApi(`${blogUrl}/blogs/total-pages`)
  const data: { [total_pages: string]: number } = await response.json()

  return data.total_pages
}

export const getBlogs = async (page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await callApi(`${blogUrl}/blogs?page=${page}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlogsByTag = async (tag: string, page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await callApi(`${blogUrl}/blogs/tag/${tag}?page=${page}`)
  const paginatedBlogList: PaginatedBlogList = await response.json()

  return paginatedBlogList
}

export const getBlog = async (slug: string): Promise<Blog> => {
  const response: Response = await callApi(`${blogUrl}/blogs/${slug}`)
  const blog: Blog = await response.json()

  return blog
}

export const getLatest = async (): Promise<BlogItem[]> => {
  const response: Response = await callApi(`${blogUrl}/blogs/latest`)
  const blogs: BlogItem[] = await response.json()

  return blogs
}
