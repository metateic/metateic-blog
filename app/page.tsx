import { Band } from "@metateic/ui"
import { allPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import { Masthead } from "./components/Masthead"
import { FeaturedPost, PostCards } from "./components/PostList"

export default function Home() {
  const posts = allPosts()
  const lead = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post !== lead)

  return (
    <>
      <Masthead title={site.heading} lede={site.description} />
      <Band>
        {lead ? <FeaturedPost post={lead} /> : <p className="text-muted-foreground">No posts yet.</p>}
        {rest.length > 0 ? (
          <div className="mt-10">
            <PostCards posts={rest} />
          </div>
        ) : null}
      </Band>
    </>
  )
}
