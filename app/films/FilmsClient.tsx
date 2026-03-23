"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FloatingModel from "../components/FloatingModel";
import BackgroundVideo from "../components/BackgroundVideo";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? null,
    [projects, activeId]
  );

  const bgVideo = activeProject?.hoverVideoUrl
  ? activeProject.hoverVideoUrl.replace("http://localhost:3000", "")
  : undefined;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      <BackgroundVideo src={bgVideo} />

      {bgVideo ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ) : null}

      <FloatingModel url="/models/model.glb" scale={0.28} />

      <main
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          padding: isMobile ? 20 : 32,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "420px 1fr",
          gap: isMobile ? 20 : 24,
          opacity: mounted ? 1 : 0,
          transform: "translateY(0px)",
          transition: "opacity 100ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignSelf: isMobile ? "flex-start" : "center",
            minWidth: 0,
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <Link
              href="/"
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: isMobile ? 13 : 14,
              }}
            >
              ← Home
            </Link>

            <h1
              style={{
                color: "yellow",
                fontSize: isMobile ? 20 : 24,
                fontFamily: "Neue Haas Bold",
                margin: "10px 0 0",
              }}
            >
              Films
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 20 : 30,
            }}
          >
            {projects.map((p) => {
              const isActive = p._id === activeId;

              return (
                <button
                  key={p._id}
                  type="button"
                  onMouseEnter={() => !isMobile && setActiveId(p._id)}
                  onFocus={() => setActiveId(p._id)}
                  onMouseLeave={() => !isMobile && setActiveId(null)}
                  onClick={() => setOpenProject(p)}
                  style={{
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transform: !isMobile && isActive ? "translateX(8px)" : "translateX(0px)",
                    transition: "transform 180ms ease, opacity 180ms ease",
                    color: "white",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? 16 : 22,
                      lineHeight: 1.15,
                      fontWeight: "bold",
                      fontFamily: "Neue Haas Bold",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {p.title ?? "Untitled"}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      color: "rgba(255,255,255,1)",
                      fontSize: isMobile ? 11 : 12,
                      fontFamily: "Neue Haas Medium",
                    }}
                  >
                    {p.year ?? ""}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color: "rgba(255,255,255,1)",
                      fontSize: isMobile ? 12 : 14,
                      fontFamily: "Neue Haas Bold",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {p.client ?? ""}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section
          style={{
            display: isMobile ? "none" : "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 14,
              maxWidth: 520,
              textAlign: "right",
            }}
          />
        </section>
      </main>

      {openProject ? (
        <YouTubeModal project={openProject} onClose={() => setOpenProject(null)} />
      ) : null}
    </div>
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
        padding: isTouchDevice() ? 12 : 24,
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

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}