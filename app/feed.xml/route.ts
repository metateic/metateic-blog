import { allPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export const dynamic = "force-static"

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

// Feed readers need absolute URLs inside the post body.
const absolute = (html: string) => html.replace(/(src|href)="\//g, `$1="${site.url}/`)

export function GET() {
  const posts = allPosts().slice(0, 20)
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${site.url}${post.url}</link>
      <guid isPermaLink="true">${site.url}${post.url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
      <content:encoded><![CDATA[${absolute(post.html).replace(/]]>/g, "]]&gt;")}]]></content:encoded>
${[...post.categories, ...post.tags].map((name) => `      <category>${escape(name)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escape(site.title)}</title>
    <description>${escape(site.description)}</description>
    <link>${site.url}/</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-CA</language>
${posts[0] ? `    <lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
