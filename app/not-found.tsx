import { Band, Button } from "@metateic/ui"

export default function NotFound() {
  return (
    <Band>
      <h1 className="text-4xl font-semibold tracking-[-0.02em]">That page isn't here.</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">
        The post may have moved. Every post is listed on the home page.
      </p>
      <Button href="/" size="md" className="mt-8">
        See all posts
      </Button>
    </Band>
  )
}
