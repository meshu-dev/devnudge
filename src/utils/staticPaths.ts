import type { NotionPage } from "../types/notion"
import type { BlogStaticPathParams, TagStaticPathParams } from "../types/blog"
import { getNotionPages } from "./notion"

export const getBlogViewPaths = async (): Promise<BlogStaticPathParams[]> => {
  const pages: NotionPage[] = await getNotionPages()
  const slugParams: BlogStaticPathParams[] = []

  for (const page of pages) {
    if (page.slug) {
      slugParams.push({ params: { slug: page.slug } })
    }
  }
  return slugParams
}

export const getTaggedBlogListPaths = async (): Promise<TagStaticPathParams[]> => {
  const pages: NotionPage[] = await getNotionPages()
  const tagParams: TagStaticPathParams[] = []

  const tagNames: Array<string> = []

  for (const page of pages) {
    for (const tag of page.tags) {
      const name: string = tag.name

      if (tagNames.indexOf(name) == -1) {
        tagNames.push(tag.name)
      }
    }
  }

  for (const tag of tagNames) {
    tagParams.push({ params: { tag } })
  }

  return tagParams
}