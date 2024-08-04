import type { BlogStaticPathParams, TagStaticPathParams } from "@/types/static"
import { getSlugs, getTags } from "./api"

export const getBlogViewPaths = async (): Promise<BlogStaticPathParams[]> => {
  const slugs: Array<string> = await getSlugs()
  const slugParams: BlogStaticPathParams[] = slugs.map(slug => ({ params: { slug } }))

  return slugParams
}

export const getTaggedBlogListPaths = async (): Promise<TagStaticPathParams[]> => {
  const tags: string[] = await getTags()
  const tagParams: TagStaticPathParams[] = tags.map(tag => ({ params: { tag } }))

  return tagParams
}