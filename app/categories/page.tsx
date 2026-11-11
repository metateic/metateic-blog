import type { Metadata } from "next"
import { Band } from "@metateic/ui"
import { groupPosts } from "@/lib/posts"
import { Masthead } from "../components/Masthead"
import { GroupedPosts } from "../components/PostList"

export const metadata: Metadata = { title: "Categories", alternates: { canonical: "/categories/" } }

export default function Page() {
  return (
    <>
      <Masthead title="Categories" />
      <Band>
        <GroupedPosts groups={groupPosts("categories")} />
      </Band>
    </>
  )
}
