export type DesignProject = {
  slug: string
  title: string
  year?: string
  cover?: string
  description?: string
}

export const designProjects: DesignProject[] = [
  {
    slug: "townsend-furniture",
    title: "Townsend Furniture",
    year: "2026",
    description: "Shopify redesign + accessibility pass",
  },
  {
    slug: "the-den",
    title: "The Den",
    year: "2026",
    description: "Landing + motion-driven layout system",
  },
  {
    slug: "bronze56k-lookbook",
    title: "Bronze56k Lookbook",
    year: "2025",
    description: "Editorial layout + modular components",
  },
]