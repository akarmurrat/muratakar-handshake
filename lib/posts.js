import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
}

export async function getPost(slug) {
  const fullPath = path.join(postsDirectory, slug + '.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark().use(gfm).use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || new Date().toISOString(),
    excerpt: matterResult.data.excerpt || '',
    contentHtml
  }
}

export async function getSortedPosts() {
  const slugs = getAllSlugs().map(s => s.replace(/\.md$/, ''))
  const posts = await Promise.all(slugs.map(getPost))
  return posts.sort((a,b) => (a.date > b.date ? -1 : 1))
}
