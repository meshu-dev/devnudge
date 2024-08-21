import type { BlogListStaticPathParams, BlogStaticPathParams, TagStaticPathParams } from "@/types/static"
import { getSlugs, getTags, getTotalPages } from "./api"

export const getBlogViewPaths = async (): Promise<BlogStaticPathParams[]> => {
  const slugs: Array<string> = await getSlugs()
  const slugParams: BlogStaticPathParams[] = slugs.map(slug => ({ params: { slug } }))

  return slugParams
}

export const getBlogListPaths = async (): Promise<BlogListStaticPathParams[]> => {
  const totalPages: number = await getTotalPages()
  const blogListParams: BlogListStaticPathParams[] = []

  for (let index: number = 0; index < totalPages; index++) {
    blogListParams.push({ params: { page: (index + 1) } })
  }

  return blogListParams
}

export const getTaggedBlogListPaths = async (): Promise<TagStaticPathParams[]> => {
  const tags: string[] = await getTags()
  const tagParams: TagStaticPathParams[] = tags.map(tag => ({ params: { tag } }))

  return tagParams
}