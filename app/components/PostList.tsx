import { LinkCards } from "@metateic/ui"
import { formatDate, type Post } from "@/lib/posts"

export function PostCards({ posts }: { posts: Post[] }) {
  return (
    <LinkCards
      items={posts.map((post) => ({
        href: post.url,
        eyebrow: formatDate(post.date),
        title: post.title,
        body: post.excerpt,
      }))}
    />
  )
}

/** The lead post on the home page: image beside a large title. */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      className="group grid overflow-hidden rounded-card border border-border bg-card transition-colors hover:border-primary md:grid-cols-2"
    >
      {post.image ? (
        <img src={post.image} alt="" className="h-auto w-full self-center" />
      ) : (
        <div aria-hidden="true" className="aspect-[16/10] bg-inverse surface-glow md:aspect-auto" />
      )}
      <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
        <p className="text-sm text-muted-foreground">
          {formatDate(post.date)}, {post.minutes} min read
        </p>
        <h2 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance md:text-4xl md:leading-[1.12]">
          {post.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-pretty text-muted-foreground">{post.excerpt}</p>
      </div>
    </a>
  )
}

/** Posts grouped under tag or category headings, each heading linkable by id. */
export function GroupedPosts({ groups }: { groups: { id: string; name: string; posts: Post[] }[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight capitalize">{group.name}</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {group.posts.map((post) => (
              <li key={post.slug}>
                <a href={post.url} className="flex flex-col gap-1 py-4 hover:text-primary sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-28 shrink-0 text-sm text-muted-foreground tabular-nums">{formatDate(post.date)}</span>
                  <span className="font-medium text-pretty">{post.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
