import { Client } from '@notionhq/client'
import type { GetPageResponse, PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionPage } from '../types/notion'

export const getNotionClient = (): Client => {
  return new Client({ auth: process.env.NOTION_TOKEN })
}

export const getNotionDatabase = async (): Promise<QueryDatabaseResponse> => {
  const notion = getNotionClient()

  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || ''
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
    pages.push(makeNotionPage(page))
  }
  return pages
}

const makeNotionPage = (page: any): NotionPage => {
  const id: string = page.id
  const properties = page.properties

  const notionPage: NotionPage = {
    id: page.id,
    slug: properties.URL.url,
    heading: properties.Name.title[0]['plain_text'],
    tags: properties.Tags.multi_select,
    createdAt: properties.Created.created_time
  }
  return notionPage
}