"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FloatingModel from "../components/FloatingModel";
import { urlFor } from "@/lib/image";

type DevProject = {
  _id: string;
  title?: string;
  year?: number;
  client?: string;
  hoverImage?: any; // Sanity image object
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
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "black" }}>
      {/* Background image on hover */}
      {activeProject?.hoverImage ? (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={urlFor(activeProject.hoverImage).width(2400).height(1400).url()}
            alt={activeProject.title ?? "Background"}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}

      {/* Overlay when bg image exists */}
      {activeProject?.hoverImage ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 1,
          }}
        />
      ) : null}

      {/* Bolt always */}
      <FloatingModel url="/models/model.glb" scale={0.28} />

      {/* Content */}
      <main
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          padding: 32,
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 24,

          opacity: mounted ? 1 : 0,
          transform: "translateY(0px)",
          transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
        }}
      >
        <section style={{ display: "flex", flexDirection: "column", gap: 14, alignSelf: "center" }}>
          <div style={{ marginBottom: 14 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              ← Home
            </Link>

            <h1 style={{ color: "white", fontSize: 44, margin: "10px 0 0" }}>Dev</h1>
            <div style={{ color: "rgba(255,255,255,0.65)", marginTop: 10 }}>
              Hover to preview. Click to open.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {projects.map((p) => {
  const isActive = p._id === activeId;

  return (
    <div key={p._id} style={{ padding: 0 }}>
      <button
        type="button"
        onMouseEnter={() => setActiveId(p._id)}
        onFocus={() => setActiveId(p._id)}
        onMouseLeave={() => setActiveId(null)}
        style={{
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "default",
          color: "white",
          width: "100%",

          opacity: isActive ? 1 : 1,
          transform: isActive ? "translateX(8px)" : "translateX(0px)",
          transition: "transform 180ms ease, opacity 180ms ease",
        }}
      >
        <div style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 'bold', cursor: 'pointer' }}>{p.title ?? "Untitled"}</div>
        <div style={{ marginTop: 0, color: "rgba(255,255,255)", fontSize: 13, cursor: 'pointer' }}>{p.year ?? ""}</div>
        <div style={{ marginTop: 0, color: "rgba(255,255,255)", fontSize: 13, cursor: 'pointer' }}>{p.client ?? ""}</div>

        {p.devLink ? (
          <a
            href={p.devLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-block",
              marginTop: 0,
              fontSize: 13,
              fontWeight: 'bold',
              color: "rgba(255,255,255)",
              textDecoration: "none",
              pointerEvents: "auto",
            }}
          >
            {p.devLink}
          </a>
        ) : null}
      </button>
    </div>
  );
})}

          
          </div>
        </section>

        <section style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, maxWidth: 520, textAlign: "right" }}>
            Shopify • Next.js • Liquid • Performance
          </div>
        </section>
      </main>

      {/* Modal */}
       
    </div>
  );
}

function DevModal({ project, onClose }: { project: DevProject; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
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
          width: "min(900px, 96vw)",
          background: "#0b0b0b",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ padding: 16, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ color: "white", fontSize: 18 }}>{project.title ?? "Project"}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>
              {project.client ?? ""} {project.year ? `• ${project.year}` : ""}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        {project.devLink ? (
          <div style={{ padding: 16 }}>
            <a
              href={project.devLink}
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Open link
            </a>
          </div>
        ) : (
          <div style={{ padding: 16, color: "rgba(255,255,255,0.7)" }}>
            Add a <code style={{ color: "white" }}>devLink</code> in Sanity for this project.
          </div>
        )}
      </div>
    </div>
  );
}
