import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Will Hoad - Iterate Everything",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "quartz.jzhao.xyz",
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
          light: "#fdfcf5", // Off-white, like aged paper or birch bark
          lightgray: "#e9e2d0", // Light beige for subtle borders
          gray: "#8a7d6e", // Muted brown for subtitles
          darkgray: "#2f3e3a", // Deep charcoal-green for body text
          dark: "#1a2b27", // Deep forest-green for headings
          secondary: "#216e39", // Deep forest-green for links (like foliage)
          tertiary: "#8fa2a3", // Muted cool teal (the river hint)
          highlight: "rgba(33, 110, 57, 0.05)",
          textHighlight: "rgba(81, 162, 218, 0.1)"
        },
        darkMode: {
          light: "#14181a", // Very deep night sky or cool black
          lightgray: "#2c353a", // Subtle cool-gray for borders
          gray: "#8fa2a3", // Muted cool teal/gray for subtitles
          darkgray: "#d9dadb", // Off-white for body text
          dark: "#ffffff", // Pure white for headings
          secondary: "#51a2da", // Vibrant, clear river blue for links
          tertiary: "#2f3e3a", // Deep charcoal-green accents
          highlight: "rgba(81, 162, 218, 0.1)",
          textHighlight: "rgba(81, 162, 218, 0.1)"
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
