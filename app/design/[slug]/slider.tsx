"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { designProjects } from "@/lib/designProjects"

export default function DesignSlider({ initialIndex }: { initialIndex: number }) {
  const router = useRouter()
  const projects = useMemo(() => designProjects, [])
  const [index, setIndex] = useState(initialIndex)

  const current = projects[index]
  const prevIndex = (index - 1 + projects.length) % projects.length
  const nextIndex = (index + 1) % projects.length

  const goTo = (i: number) => {
    setIndex(i)
    router.push(`/design/${projects[i].slug}`)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(prevIndex)
      if (e.key === "ArrowRight") goTo(nextIndex)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prevIndex, nextIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          onClick={() => goTo(prevIndex)}
          aria-label="Previous project"
          style={btn}
        >
          ←
        </button>

        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{current.title}</div>
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            {current.year ? `${current.year} · ` : ""}{current.description ?? ""}
          </div>
          <div style={{ opacity: 0.5, marginTop: 10 }}>
            {index + 1} / {projects.length}
          </div>
        </div>

        <button
          onClick={() => goTo(nextIndex)}
          aria-label="Next project"
          style={btn}
        >
          →
        </button>
      </div>

      {/* “Slide” area (swap this for images, videos, etc.) */}
      <section
        style={{
          marginTop: 24,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          padding: 18,
          minHeight: 260,
          display: "grid",
          placeItems: "center",
          fontSize: 16,
          opacity: 0.9,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Project content goes here</div>
          <div style={{ opacity: 0.7 }}>
            Replace this box with images/video components for <b>{current.title}</b>.
          </div>
        </div>
      </section>
    </main>
  )
}

const btn: React.CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: 22,
  cursor: "pointer",
}