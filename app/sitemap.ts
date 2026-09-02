import { getDevPosts } from '@/app/experience/utils'

export const baseUrl = 'https://renato-torres.vercel.app/'

export default async function sitemap() {
  let posts = getDevPosts().map((post) => ({
    url: `${baseUrl}/dev/${post.slug}`,
    lastModified: post.metadata.endDate,
  }))

  let routes = ['', '/dev'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts]
}
