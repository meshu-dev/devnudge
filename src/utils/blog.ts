import { getNotionPage, getNotionPages } from "./notion"
import type { NotionPage } from "../types/notion"
import type { BlogPage } from "../types/blog"
import { getPageMarkdown } from "./notionMarkdown"
import { Marked } from "marked"
import type { MdStringObject } from "notion-to-md/build/types"
import { markedHighlight } from "marked-highlight"
import hljs from 'highlight.js'

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

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
    })
  )
  

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
