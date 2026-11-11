import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"
import { authors } from "./site"

export type Post = {
  slug: string
  /** Site-relative URL with a trailing slash, matching the old Jekyll permalinks. */
  url: string
  title: string
  date: Date
  author: string
  categories: string[]
  tags: string[]
  excerpt: string
  image?: string
  featured: boolean
  minutes: number
  html: string
}

const POSTS_DIR = path.join(process.cwd(), "_posts")
const PUBLIC_DIR = path.join(process.cwd(), "public")
const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean)
  return []
}

function toDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) return new Date(value)
  return undefined
}

const plain = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

/** Posts often open with a heading that repeats the title; the page already shows the title. */
function dropRepeatedTitle(markdown: string, title: string) {
  const lines = markdown.split("\n")
  const first = lines.findIndex((line) => line.trim() !== "")
  const match = first >= 0 ? /^(#{1,6})\s+(.*)$/.exec(lines[first].trim()) : null
  if (!match) return markdown
  const heading = plain(match[2])
  const wanted = plain(title)
  const repeats = heading !== "" && (wanted.startsWith(heading) || heading.startsWith(wanted))
  if (match[1].length === 1 || repeats) lines.splice(first, 1)
  return lines.join("\n")
}

/** Site-root path for an image referenced in front matter or content, if the file exists. */
function publicPath(reference: unknown): string | undefined {
  if (typeof reference !== "string" || reference.trim() === "") return undefined
  if (/^https?:\/\//.test(reference)) return reference
  const relative = reference.replace(/^\.?\/?(public\/)?/, "")
  return fs.existsSync(path.join(PUBLIC_DIR, relative)) ? `/${relative}` : undefined
}

function render(markdown: string) {
  const html = marked.parse(markdown, { gfm: true, async: false })
  return (
    html
      // The page title is the only h1.
      .replace(/<(\/?)h1(\s|>)/g, "<$1h2$2")
      // Relative asset paths (assets/…, media/…, public/media/…) are served from the site root.
      .replace(/(src|href)="(?!https?:|\/|#|mailto:|tel:)(?:\.\/)?(?:public\/)?([^"]+)"/g, '$1="/$2"')
      .replace(/<img /g, '<img loading="lazy" decoding="async" ')
  )
}

function excerptFrom(markdown: string) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block !== "" && !/^(#|!\[|[-*] |\d+\. |>|```)/.test(block))
  const text = (paragraph ?? "").replace(/[*_`]|\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ")
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text
}

function load(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"))
  const base = file.replace(/\.md$/, "")
  const slug = base.replace(DATE_PREFIX, "")
  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : slug.replace(/-/g, " ")
  const date =
    toDate(data.date) ??
    toDate(DATE_PREFIX.exec(base)?.[1]) ??
    toDate(data.created_time) ??
    toDate(data.last_edited_time)
  if (!date) throw new Error(`_posts/${file} needs a "date" in its front matter or a YYYY-MM-DD- filename prefix`)

  const body = dropRepeatedTitle(content, title)
  const authorKey = typeof data.author === "string" ? data.author.trim() : "metateic"

  return {
    slug,
    url: `/${slug}/`,
    title,
    date,
    author: authors[authorKey.toLowerCase()] ?? authorKey,
    categories: list(data.categories),
    tags: list(data.tags),
    excerpt: [data.excerpt, data.summary, data.description].find((v): v is string => typeof v === "string" && v.trim() !== "")?.trim() ?? excerptFrom(body),
    image: publicPath(data.image),
    featured: data.featured === true,
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    html: render(body),
  }
}

let cache: Post[] | undefined

/** Every post in `_posts/`, newest first. */
export function allPosts(): Post[] {
  cache ??= fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(load)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
  return cache
}

export function findPost(slug: string) {
  return allPosts().find((post) => post.slug === slug)
}

/** Posts grouped under each tag or category, groups sorted by name. */
export function groupPosts(by: "tags" | "categories") {
  const groups = new Map<string, { name: string; posts: Post[] }>()
  for (const post of allPosts()) {
    for (const name of post[by]) {
      const key = name.toLowerCase()
      const group = groups.get(key) ?? { name, posts: [] }
      group.posts.push(post)
      groups.set(key, group)
    }
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, group]) => ({ id: key.replace(/[^a-z0-9]+/g, "-"), ...group }))
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

export const formatDate = (date: Date) => dateFormat.format(date)
