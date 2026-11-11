import { allPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export const dynamic = "force-static"

/** Read by metateic.com at build time to list the latest posts. */
export function GET() {
  return Response.json(
    allPosts().map((post) => ({
      title: post.title,
      url: site.url + post.url,
      date: post.date.toISOString(),
      excerpt: post.excerpt,
      tags: post.tags,
      image: post.image ? (post.image.startsWith("/") ? site.url + post.image : post.image) : null,
    })),
  )
}
