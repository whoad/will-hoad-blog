import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Iterate Everything",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "willhoad.co.uk",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf9f6",       // Soft parchment (Background)
          lightgray: "#e5e2de",   // Warm stone (Borders/UI)
          gray: "#99948f",        // Muted taupe (Graph lines/Meta)
          darkgray: "#403e3c",    // Deep charcoal-brown (Body text)
          dark: "#1c1b1a",        // Ink black (Headers)
          secondary: "#4c7a4c",   // Forest Green (Links/Icons)
          tertiary: "#7b4b94",    // Royal Purple (Hover states)
          highlight: "rgba(76, 122, 76, 0.1)", // Green tint (Internal links)
          textHighlight: "#d9f2b1",             // Spring Leaf (==highlight==)
        },
        darkMode: {
          light: "#1a1a1b",       // Deep obsidian (Background)
          lightgray: "#2e2e30",   // Dark slate (Borders/UI)
          gray: "#646466",        // Medium grey (Graph lines/Meta)
          darkgray: "#d4d4d4",    // Soft silver (Body text)
          dark: "#ebebeb",        // Off-white (Headers)
          secondary: "#b39ddb",   // Glowing Lavender (Links/Icons)
          tertiary: "#8eb07d",    // Leaf Green (Hover states)
          highlight: "rgba(179, 157, 219, 0.15)", // Purple glow (Internal links)
          textHighlight: "#4a314d",               // Deep Plum (==highlight==)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
