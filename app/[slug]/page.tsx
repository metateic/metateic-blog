import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Band, Button } from "@metateic/ui"
import { allPosts, findPost, formatDate } from "@/lib/posts"
import { site } from "@/lib/site"
import { PostCards } from "../components/PostList"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return allPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: post.url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: post.url,
      publishedTime: post.date.toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const post = findPost((await params).slug)
  if (!post) notFound()
  const more = allPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      <article>
        <Band tone="navy">
          <p className="text-sm text-white/75">
            <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>, by {post.author}, {post.minutes} min read
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-5xl md:leading-[1.08]">
            {post.title}
          </h1>
        </Band>
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {post.image ? (
            <img src={post.image} alt="" className="mb-12 h-auto w-full max-w-3xl rounded-card" />
          ) : null}
          <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.tags.length > 0 ? (
            <ul className="mt-12 flex max-w-[68ch] flex-wrap gap-2 border-t border-border pt-6 text-sm">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <a
                    href={`/tags/#${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="inline-block rounded-control border border-border px-3 py-1 text-muted-foreground hover:border-primary hover:text-foreground"
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
      <Band tone="muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">More posts</h2>
          <Button href={`${site.mainSite}/#contact`} variant="outline">
            Talk to Metateic
          </Button>
        </div>
        <div className="mt-8">
          <PostCards posts={more} />
        </div>
      </Band>
    </>
  )
}
