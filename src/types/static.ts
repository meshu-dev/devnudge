export type BlogStaticPathParams = {
  params: {
    slug: string
  }
}

export type BlogListStaticPathParams = {
  params: {
    page: number
  }
}

export type TagStaticPathParams = {
  params: {
    tag: string
    page: number
  }
}
