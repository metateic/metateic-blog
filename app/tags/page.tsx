import type { Metadata } from "next"
import { Band } from "@metateic/ui"
import { groupPosts } from "@/lib/posts"
import { Masthead } from "../components/Masthead"
import { GroupedPosts } from "../components/PostList"

export const metadata: Metadata = { title: "Tags", alternates: { canonical: "/tags/" } }

export default function Page() {
  return (
    <>
      <Masthead title="Tags" />
      <Band>
        <GroupedPosts groups={groupPosts("tags")} />
      </Band>
    </>
  )
}
