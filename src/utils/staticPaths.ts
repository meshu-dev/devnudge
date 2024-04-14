import type { NotionPage } from "../types/notion"
import type { BlogStaticPathParams } from "../types/blog"
import { getNotionPages } from "./notion"

export const getBlogViewPaths = async (): Promise<BlogStaticPathParams[]> => {
  const pages: NotionPage[] = await getNotionPages()
  const slugParams: BlogStaticPathParams[] = []

  for (let page of pages) {
    if (page.slug) {
      slugParams.push({ params: { slug: page.slug } })
    }
  }
  return slugParams
}