import type { Metadata } from "next"

// The Jekyll site listed every post at /posts/ as well as the home page; keep that URL working.
export const metadata: Metadata = { title: "All posts", alternates: { canonical: "/" } }

export { default } from "../page"
