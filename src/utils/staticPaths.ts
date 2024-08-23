import type { BlogListStaticPathParams, BlogStaticPathParams, TagStaticPathParams } from "@/types/static"
import { getSlugs, getTags, getTotalPages } from "./api"
import type { Tag } from "@/types/blog"

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
  const tags: Tag[] = await getTags()
  const tagParams: TagStaticPathParams[] = []

  for (const tag of tags) {
    for (let i = 0; i < tag.total_pages; i++) {
      tagParams.push({ params: { tag: tag.name, page: (i + 1) } })
    }
  }

  return tagParams
}