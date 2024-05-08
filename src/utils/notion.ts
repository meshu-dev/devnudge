import { Client } from '@notionhq/client'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionPage } from '../types/notion'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

const notionType: string = import.meta.env.PROD ? import.meta.env.NOTION_TOKEN : import.meta.env.PUBLIC_NOTION_TOKEN
const notionDatabaseId: string = import.meta.env.PROD ? import.meta.env.NOTION_DATABASE_ID : import.meta.env.PUBLIC_NOTION_DATABASE_ID
dayjs.extend(isSameOrAfter)

export const getNotionClient = (): Client => {
  return new Client({ auth: notionType })
}

export const getNotionDatabase = async (): Promise<QueryDatabaseResponse> => {
  const notion = getNotionClient()

  return await notion.databases.query({
    database_id: notionDatabaseId
  })
}

export const getNotionPage = async (pageId: string): Promise<NotionPage> => {
  const notion = getNotionClient()
  const page = await notion.pages.retrieve({ page_id: pageId })
  return makeNotionPage(page)
}

export const getNotionPages = async (): Promise<NotionPage[]> => {
  const database: QueryDatabaseResponse = await getNotionDatabase()

  const pages: NotionPage[] = []

  for (let page of database.results) {
    const notionPage: NotionPage = makeNotionPage(page)

    if (
      notionPage.slug &&
      notionPage.status === 'Done' &&
      notionPage.publishedAt &&
      dayjs().isSameOrAfter(dayjs(notionPage.publishedAt)) 
    ) {
      pages.push(notionPage)
    }
  }
  return pages
}

export const getNotionPagesByTag = async (tag: string): Promise<NotionPage[]> => {
  const pages: NotionPage[]       = await getNotionPages()
  const taggedPages: NotionPage[] = []

  for (const page of pages) {
    let hasTag = false

    for (const pageTag of page.tags) {
      if (pageTag.name == tag) {
        hasTag = true
        break
      }
    }

    if (hasTag) {
      taggedPages.push(page)
    }
  }
  return taggedPages
}

const makeNotionPage = (page: any): NotionPage => {
  const properties = page.properties

  const notionPage: NotionPage = {
    id: page.id,
    slug: properties.URL.url,
    heading: properties.Name.title[0]['plain_text'],
    status: properties.Status.status.name,
    tags: properties.Tags.multi_select,
    publishedAt: properties.Published.date?.start,
    createdAt: properties.Created.created_time
  }
  return notionPage
}