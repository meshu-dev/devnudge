import type { Blog, PaginatedBlogList, TagList, SlugList, Tag } from "@/types/blog"

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
  const result: { data: { token: string }} = await response.json()
  return result.data.token
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

export const getSlugs = async (): Promise<SlugList> => {
  const response: Response = await callApi(`${blogUrl}/blogs/slugs`)
  const slugList: SlugList = await response.json()

  return slugList
}

export const getTags = async (): Promise<TagList> => {
  const response: Response = await callApi(`${blogUrl}/tags`)
  const tagList: TagList = await response.json()

  return tagList
}

export const getTotalPages = async (): Promise<number> => {
  const response: Response = await callApi(`${blogUrl}/blogs/total-pages`)
  const data: { [total_pages: string]: number } = await response.json()

  return data.total_pages
}

export const getBlogs = async (page: number = 1): Promise<PaginatedBlogList> => {
  const response: Response = await callApi(`${blogUrl}/blogs?page=${page}`)
  const blogList: PaginatedBlogList = await response.json()

  return blogList
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

export const getLatest = async (): Promise<PaginatedBlogList> => {
  const response: Response = await callApi(`${blogUrl}/blogs?page=1&per_page=5`)
  const blogList: PaginatedBlogList = await response.json()

  return blogList
}
