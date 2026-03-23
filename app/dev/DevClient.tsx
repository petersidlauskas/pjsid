"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FloatingModel from "../components/FloatingModel";
import { urlFor } from "@/lib/image";
import BackgroundVideo from "../components/BackgroundVideo";

type DevProject = {
  _id: string;
  title?: string;
  year?: number;
  client?: string;
  hoverImage?: any;
  devLink?: string;
};

export default function DevClient({ projects }: { projects: DevProject[] }) {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const activeProject = useMemo(
    () => projects.find((p) => p._id === activeId) ?? null,
    [projects, activeId]
  );

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "black" }}>
      <BackgroundVideo />
      <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}>
        <FloatingModel url="/models/model.glb" scale={0.28} />
      </div>

      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: 32,
     
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "420px minmax(0, 1fr)",
          gap: 40,
          opacity: mounted ? 1 : 0,
          transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
        }}
      >
        <section style={{ position: "relative", zIndex: 3 }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
            ← Home
          </Link>

          

          <h1 style={{ color: "yellow", fontSize: 24, fontFamily:"Neue Haas Bold", margin: "12px 0 22px" }}>Dev</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {projects.map((p) => {
              const isActive = p._id === activeId;

              const cardStyles: React.CSSProperties = {
                display: "block",
                transform: isActive ? "translateX(8px)" : "translateX(0)",
                transition: "transform 180ms ease",
                color: "white",
                textDecoration: "none",
                cursor: p.devLink ? "pointer" : "default",
              };

              

              const content = (
                <>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{p.title ?? "Untitled"}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{p.year ?? ""}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{p.client ?? ""}</div>

                  {p.devLink ? (
                    <div
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "white",
                        textDecoration: "underline",
                        wordBreak: "break-all",
                      }}
                    >
                      {p.devLink}
                    </div>
                  ) : null}
                </>
              );

              if (p.devLink) {
                return (
                  <a
                    key={p._id}
                    href={p.devLink}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setActiveId(p._id)}
                    onMouseLeave={() => setActiveId(null)}
                    style={cardStyles}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={p._id}
                  onMouseEnter={() => setActiveId(p._id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={cardStyles}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 120,
              width: 720,
              height: 480,
              maxWidth: "100%",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              opacity: activeProject?.hoverImage ? 1 : 0,
              transition: "opacity 320ms ease",
            }}
          >
            {activeProject?.hoverImage ? (
              <Image
                key={activeProject._id}
                src={urlFor(activeProject.hoverImage).width(1200).height(800).url()}
                alt={activeProject.title ?? "Preview"}
                fill
                priority
                style={{ objectFit: "fill" }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  textAlign: "center",
                  padding: 16,
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.3) 100%)",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

