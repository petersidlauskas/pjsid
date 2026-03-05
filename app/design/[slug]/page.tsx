import { notFound } from "next/navigation"
import DesignSlider from "./slider"
import { designProjects } from "@/lib/designProjects"

export default function DesignProjectPage({ params }: { params: { slug: string } }) {
  const idx = designProjects.findIndex((p) => p.slug === params.slug)
  if (idx === -1) return notFound()

  return <DesignSlider initialIndex={idx} />
}