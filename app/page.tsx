"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import FloatingModel from "./components/FloatingModel";
import TransitionLink from "./components/TransitionLink";
import NycInfo from "./components/NycInfo";
import BackgroundVideo from "./components/BackgroundVideo";

type MenuKey = "films" | "dev" | "design" | "contact";

export default function Home() {
  const items = useMemo(
    () => [
      { key: "films" as const, label: "Film", href: "/films", video: "/videos/film.mp4" },
      { key: "dev" as const, label: "Dev", href: "/dev", video: "/videos/spwebsite_1.mp4" },
      { key: "design" as const, label: "Design", href: "/design", video: "/videos/design.mp4" },
      { key: "contact" as const, label: "Contact", href: "/contact", video: "/videos/clouds.mp4" },
    ],
    []
  );

  // 👇 DEFAULT: no active section
  const [active, setActive] = useState<MenuKey | null>(null);

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  const activeVideo = isMobile
  ? "/videos/film.mp4"
  : items.find((i) => i.key === active)?.video;

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
      

<BackgroundVideo src={activeVideo} />

      {/* Layer 1: dark overlay ONLY when video exists */}
      {activeVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
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
          gridTemplateColumns: isMobile ? "1fr" : "320px 1fr",
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
            <div style={{ color: "rgba(255,255,255,0.85)", letterSpacing: 1, fontSize: 12, fontFamily: 'Neue Haas Light' }}>
              
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
                color: isActive ? "yellow" : "white",
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

          
        </nav>

        {/* Right column (optional copy) */}
<section
  style={{
    display: "flex",
    alignItems: isMobile ? "flex-start" : "flex-end",
    justifyContent: isMobile ? "flex-start" : "flex-end",
    flexDirection: "column",
  }}
>
  <div
    style={{
      color: "rgba(255,255,255,0.7)",
      fontSize: 14,
      textAlign: isMobile ? "left" : "right",
      fontFamily: "Neue Haas Bold",
      width: "100%",
    }}
  >
    peter sidlauskas
  </div>

  <div
    style={{
      width: "100%",
      textAlign: isMobile ? "left" : "right",
    }}
  >
    <NycInfo isMobile={isMobile} />
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
