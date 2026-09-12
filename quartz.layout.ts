import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

function parseDate(d: unknown): number | null {
  if (!d) return null
  if (d instanceof Date) return isNaN(d.getTime()) ? null : d.getTime()
  if (typeof d === "string" || typeof d === "number") {
    const parsed = new Date(d)
    return isNaN(parsed.getTime()) ? null : parsed.getTime()
  }
  return null
}

function getNoteDate(f: QuartzPluginData): number {
  const fm = f.frontmatter
  if (fm) {
    const updated = parseDate(fm.updated ?? fm.modified)
    if (updated !== null) return updated
    const created = parseDate(fm.created ?? fm.date)
    if (created !== null) return created
  }
  if (f.dates?.created) {
    return f.dates.created.getTime()
  }
  return 0
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "LinkedIn": "https://www.linkedin.com/in/will-hoad/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.Banner(),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !page.fileData.frontmatter?.banner,
    }),
    Component.ContentMeta(),
    Component.Lightbox(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
    Component.DesktopOnly(Component.TagList()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  // Add afterBody to render recent posts below index.md content:
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recently Iterated Insights",
        limit: 5,
        showTags: true,
        filter: (f) => f.slug !== "index" && String(f.frontmatter?.type).toLowerCase() === "blog",
        sort: (f1, f2) => getNoteDate(f2) - getNoteDate(f1),
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.Banner(),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !page.fileData.frontmatter?.banner,
    }),
    Component.ContentMeta(),
    Component.Lightbox(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}

