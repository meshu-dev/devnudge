export type NotionPage = {
  id: string
  slug: string
  heading: string
  tags: NotionTag[]
  createdAt: string
}

export type NotionTag = {
  id: string
  name: string
  color: string
}