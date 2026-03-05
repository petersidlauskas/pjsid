"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function DesignCarousel({ images }: { images: string[] }) {
  const [i, setI] = useState(0)

  const prev = () => setI((n) => (n - 1 + images.length) % images.length)
  const next = () => setI((n) => (n + 1) % images.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  if (!images.length) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Design</h1>
        <p style={{ opacity: 0.7 }}>Add images to /public/design and list them in app/design/page.tsx</p>
      </main>
    )
  }

  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        
        <div style={{ opacity: 0.6 }}>{i + 1} / {images.length}</div>
      </header>

      <div style={{ position: "relative", width: "100%", height: "72vh", borderRadius: 18, overflow: "hidden" }}>
        <Image
          src={images[i]}
          alt={`Design image ${i + 1}`}
          fill
          priority
          style={{ objectFit: "contain", background: "#0b0b0b" }}
        />

        <button onClick={prev} aria-label="Previous" style={{ ...btn, left: 12 }}>←</button>
        <button onClick={next} aria-label="Next" style={{ ...btn, right: 12 }}>→</button>
      </div>
    </main>
  )
}

const btn: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 54,
  height: 54,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(0,0,0,0.45)",
  color: "white",
  fontSize: 22,
  cursor: "pointer",
  backdropFilter: "blur(6px)",
}