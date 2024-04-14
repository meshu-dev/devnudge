import { NotionToMarkdown } from 'notion-to-md'
import type { MdStringObject } from 'notion-to-md/build/types'
import { getNotionClient } from './notion'

const getNotionToMarkdown = (): NotionToMarkdown => {
  const notion = getNotionClient()
  return new NotionToMarkdown({ notionClient: notion })
}

export const getPageMarkdown = async (pageId: string): Promise<MdStringObject> => {
  const n2m = getNotionToMarkdown()

  const mdblocks = await n2m.pageToMarkdown(pageId)
  return n2m.toMarkdownString(mdblocks)
}
