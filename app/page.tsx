"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FloatingModel from "./components/FloatingModel";
import TransitionLink from "./components/TransitionLink";

type MenuKey = "films" | "dev" | "design" | "contact";

export default function Home() {
  const items = useMemo(
    () => [
      { key: "films" as const, label: "Films", href: "/films", video: "/videos/film.mp4" },
      { key: "dev" as const, label: "Dev", href: "/dev", video: "/videos/spwebsite.mp4" },
      { key: "design" as const, label: "Design", href: "/work?tag=design", video: "/videos/design.mp4" },
      { key: "contact" as const, label: "Contact", href: "/contact", video: "/videos/contact.mp4" },
    ],
    []
  );

  // 👇 DEFAULT: no active section
  const [active, setActive] = useState<MenuKey | null>(null);

  const activeVideo = items.find((i) => i.key === active)?.video;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "black", // 👈 default background
      }}
    >
      {/* Layer 0: background video ONLY when hovering */}
      {activeVideo && <VideoBackground src={activeVideo} />}

      {/* Layer 1: dark overlay ONLY when video exists */}
      {activeVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 1,
          }}
        />
      )}

      {/* Layer 2: spinning 3D model (always visible) */}
      <FloatingModel url="/models/model.glb" scale={0.32} />

      {/* Layer 3: menu / text */}
      <main
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          padding: 32,
          gap: 24,
        }}
      >
        {/* Left column menu */}
        <nav
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
          onMouseLeave={() => setActive(null)} // 👈 return to black
        >
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: "rgba(255,255,255,0.85)", letterSpacing: 1, fontSize: 12 }}>
              peter sidlauskas
            </div>
           
          </div>

          {items.map((item) => {
            const isActive = item.key === active;

            return (
              <TransitionLink
              key={item.key} 
              href={item.href}
              durationMs={500}  // 👈 slower fade out from video to black
              onMouseEnter={() => setActive(item.key)}
              onFocus={() => setActive(item.key)}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 44,
                lineHeight: 1.02,
                letterSpacing: -0.5,
                opacity: isActive ? 1 : 1,
                transform: isActive ? "translateX(8px)" : "translateX(0px)",
                transition: "transform 180ms ease, opacity 180ms ease",
                width: "fit-content",
              }}
>
  {item.label}
</TransitionLink>

            );
          })}

          <div style={{ marginTop: 22, color: "rgba(255,255,255,0.7)", fontSize: 13, maxWidth: 260 }}>
            Hover to reveal the reel. Click to enter.
          </div>
        </nav>

        {/* Right column (optional copy) */}
        <section style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, maxWidth: 520, textAlign: "right" }}>
            Motion, web, and design work. New York City.
          </div>
        </section>
      </main>
    </div>
  );
}

function VideoBackground({ src }: { src: string }) {
  return (
    <video
      key={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
