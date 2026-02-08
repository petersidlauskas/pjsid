"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FloatingModel from "../components/FloatingModel";

type FilmProject = {
  _id: string;
  title?: string;
  year?: string;
  client?: string;
  hoverVideoUrl?: string;
  youtubeUrl?: string;
};

export default function FilmsClient({ projects }: { projects: FilmProject[] }) {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<FilmProject | null>(null);

  useEffect(() => {
    // Fade in on mount
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? null,
    [projects, activeId]
  );

  const bgVideo = activeProject?.hoverVideoUrl;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      {/* Background video on hover */}
      {bgVideo ? <VideoBackground src={bgVideo} /> : null}

      {/* Optional readability overlay when video is present */}
      {bgVideo ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
      ) : null}

      {/* Spinning bolt always */}
      <FloatingModel url="/models/model.glb" scale={0.28} />

      {/* Page content */}
      <main
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          padding: 32,
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 24,

          // fade in
          opacity: mounted ? 1 : 0,
        transform: "translateY(0px)", // remove movement for a pure fade
            transition: "opacity 100ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",

        }}
      >
        {/* LEFT: list */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignSelf: "center",
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              ← Home
            </Link>
            <h1 style={{ color: "white", fontSize: 44, margin: "10px 0 0" }}>Films</h1>
            
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {projects.map((p) => {
              const isActive = p._id === activeId;

              return (
                <button
                  key={p._id}
                  type="button"
                  onMouseEnter={() => setActiveId(p._id)}
                  onFocus={() => setActiveId(p._id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setOpenProject(p)}
                  style={{
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",

                    opacity: isActive ? 1 : 1,
                    transform: isActive ? "translateX(8px)" : "translateX(0px)",
                    transition: "transform 180ms ease, opacity 180ms ease",
                    color: "white",
                  }}
                >
                  <div style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 'bold' }}>
                    {p.title ?? "Untitled"}
                  </div>

                  <div style={{ marginTop: 6, color: "rgba(255,255,255)", fontSize: 13 }}>
                    {p.year ?? ""}
                  </div>

                  <div style={{ marginTop: 4, color: "rgba(255,255,255)", fontSize: 13, fontWeight: 'bold' }}>
                    {p.client ?? ""}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* RIGHT: empty / optional */}
        <section style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, maxWidth: 520, textAlign: "right" }}>
            Director / Editor — NYC
          </div>
        </section>
      </main>

      {/* Vimeo modal */}
      {openProject ? (
  <YouTubeModal project={openProject} onClose={() => setOpenProject(null)} />
) : null}

    </div>
  );
}

function VideoBackground({ src }: { src: string }) {
  // Hard switch; if you want crossfade, I’ll upgrade it.
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

function YouTubeModal({ project, onClose }: { project: FilmProject; onClose: () => void }) {
  const videoId = extractYouTubeId(project.youtubeUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 96vw)",
          aspectRatio: "16 / 9",
          background: "#000",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            background: "rgba(0,0,0,0.6)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Close
        </button>

        {videoId ? (
          <iframe
            title={project.title ?? "YouTube"}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <div style={{ color: "white", padding: 18 }}>
            Missing/invalid YouTube URL for this project.
          </div>
        )}
      </div>
    </div>
  );
}


function extractYouTubeId(url?: string) {
  if (!url) return null;

  // Handles:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  // https://www.youtube.com/shorts/VIDEO_ID
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];

  for (const re of patterns) {
    const m = url.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

