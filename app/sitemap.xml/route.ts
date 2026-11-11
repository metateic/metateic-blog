import { allPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export function GET() {
  const urls = [
    `  <url><loc>${site.url}/</loc></url>`,
    `  <url><loc>${site.url}/categories/</loc></url>`,
    `  <url><loc>${site.url}/tags/</loc></url>`,
    ...allPosts().map(
      (post) => `  <url><loc>${site.url}${post.url}</loc><lastmod>${post.date.toISOString().slice(0, 10)}</lastmod></url>`,
    ),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } })
}
