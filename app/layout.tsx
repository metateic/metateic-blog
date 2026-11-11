import type { Metadata, Viewport } from "next"
import { Analytics, SiteFooter, SiteHeader, SkipLink, ThemeScript, ThemeToggle } from "@metateic/ui"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: { siteName: site.title, locale: "en_CA", type: "website" },
  icons: {
    icon: [
      { url: "/favicon-dark.png" },
      { url: "/favicon-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-dark.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#050815" },
  ],
}

const NAV = [
  { label: "Posts", href: "/" },
  { label: "Categories", href: "/categories/" },
  { label: "Tags", href: "/tags/" },
  { label: "About Metateic", href: site.mainSite },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by ThemeScript before hydration
    <html lang="en-CA" className="h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <Analytics
          src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
          domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
          websiteId={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <SiteHeader
          wordmark={site.name}
          logo={{ src: "/metateic-logo-horizontal.png", alt: `${site.name} blog home`, className: "brand-logo h-5 sm:h-6" }}
          links={NAV}
          cta={{ label: "Work with us", href: `${site.mainSite}/#contact` }}
          extra={<ThemeToggle />}
          mobileNav
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter wordmark={site.name} meta={"Copyright " + new Date().getFullYear() + " " + site.legalName}>
          <p className="text-sm text-muted-foreground">
            <a href="/feed.xml" className="underline underline-offset-4 hover:text-foreground">
              RSS feed
            </a>
          </p>
        </SiteFooter>
      </body>
    </html>
  )
}
