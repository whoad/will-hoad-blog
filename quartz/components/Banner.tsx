import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Banner({ fileData, displayClass }: QuartzComponentProps) {
  const bannerPath = fileData.frontmatter?.banner as string | undefined
  const title = fileData.frontmatter?.title

  if (bannerPath) {
    return (
      <div class={`page-banner ${displayClass ?? ""}`}>
        <img src={bannerPath} alt={title} />
        <div class="banner-overlay">
          <h1 class="banner-title">{title}</h1>
        </div>
      </div>
    )
  }
  return null
}

export default (() => Banner) satisfies QuartzComponentConstructor