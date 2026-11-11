# Metateic blog

The Metateic blog at [blog.metateic.ca](https://blog.metateic.ca), built with Next.js as a static export and deployed to GitHub Pages. It uses the same shared components and theme as the main site.

## Writing a post

Posts are Markdown files in `_posts/`. The file name becomes the URL: `_posts/2025-01-29-my-post.md` is published at `/my-post/` (a leading date is dropped).

```yaml
---
title: "Post title"
date: 2025-01-29          # optional if the file name starts with a date
author: liam              # a key from lib/site.ts, or any name
categories: [government, technology]
tags: [security, compliance]
excerpt: "One or two sentences shown in lists, the feed and link previews."
image: "assets/images/my-post.png"   # optional, relative to public/
featured: true            # optional, puts the post at the top of the home page
---
```

If `excerpt` is missing, the first paragraph is used. A heading at the top of the body that repeats the title is dropped, since the page already shows the title. Put images in `public/assets/images/`.

### From Notion

`.github/workflows/notion-sync.yml` (run it from the Actions tab) exports pages with Status "Ready" into `_posts/` and their images into `public/media/`, then opens a pull request.

## What the build produces

| URL | What |
|---|---|
| `/` and `/posts/` | Every post, newest first |
| `/<slug>/` | A post |
| `/categories/`, `/tags/` | Posts grouped by category and tag |
| `/feed.xml` | RSS feed with full post content |
| `/posts.json` | Title, URL, date and excerpt of each post. The main site reads this to list the latest posts. |
| `/sitemap.xml`, `/robots.txt` | For search engines |

## Local development

Components come from the shared `@metateic/ui` package, installed from `../metateic-ui`, so clone that repo beside this one first.

```bash
nvm use        # Node version from .nvmrc
npm install
npm run dev    # http://localhost:3000
```

`npm run build` writes the static site to `out/`.

## Analytics

Off by default. To turn it on, add repository **variables** `ANALYTICS_SRC` (the provider's script URL) and either `ANALYTICS_DOMAIN` (Plausible) or `ANALYTICS_WEBSITE_ID` (Umami).

## Deployment

`.github/workflows/deploy.yml` builds every pull request and deploys `main` to GitHub Pages. In repo **Settings → Pages**, the source must be **GitHub Actions**; the custom domain comes from `public/CNAME`.

CI checks out `metateic/metateic-ui` beside the app at the tag in the workflow's `ref:`. If that repo is private, add a `METATEIC_UI_TOKEN` secret: a fine-grained token with read access to it.
