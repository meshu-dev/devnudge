import { getNotionPage, getNotionPages } from "./notion"
import type { NotionPage } from "../types/notion"
import type { BlogPage } from "../types/blog"
import { getPageMarkdown } from "./notionMarkdown"
import { marked } from "marked"
import type { MdStringObject } from "notion-to-md/build/types"

export const getPageId = async (slug: string): Promise<string|null> => {
  const pages = await getNotionPages()
  const matchingPage: NotionPage[] = pages.filter(page => page.slug == slug)

  return matchingPage[0]?.id ?? null
}

export const getPageHeading = async (pageId: string): Promise<string|null> => {
  const page: NotionPage = await getNotionPage(pageId)
  return page.heading
}

export const getPageBody = async (pageId: string): Promise<string|null> => {
  const markdown: MdStringObject = await getPageMarkdown(pageId)
  return markdown.parent ? await marked.parse(markdown.parent) : null
}

export const getPage = async(slug: string): Promise<BlogPage|null> => {
  const pageId: string|null = await getPageId(slug)

  if (pageId) {
    const page: NotionPage = await getNotionPage(pageId)
    const body: string|null = await getPageBody(pageId)

    if (page && body) {
      return { heading: page.heading, body } as BlogPage
    }
  }
  return null
}
