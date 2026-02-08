"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionCtx = {
  go: (href: string, opts?: { durationMs?: number }) => void;
  isCovering: boolean;
};

const Ctx = createContext<TransitionCtx | null>(null);

export function useTransitionNav() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTransitionNav must be used within TransitionProvider");
  return v;
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isCovering, setIsCovering] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const [durationMs, setDurationMs] = useState(900);

  // When route changes (after push), reveal the new page by fading overlay out
  useEffect(() => {
    if (!isCovering) return;
    // If we’re covering and the pathname changed, fade out
    const t = window.setTimeout(() => {
      setIsCovering(false);
      setTargetHref(null);
    }, 150); // small hold so the new page is mounted under the overlay
    return () => window.clearTimeout(t);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const api = useMemo<TransitionCtx>(
    () => ({
      isCovering,
      go: (href: string, opts?: { durationMs?: number }) => {
        const d = opts?.durationMs ?? 900;
        setDurationMs(d);
        setTargetHref(href);

        // Start: fade overlay to black (covers current page)
        setIsCovering(true);

        // After fade-in, navigate
        window.setTimeout(() => {
          router.push(href);
        }, d);
      },
    }),
    [isCovering, router]
  );

  return (
    <Ctx.Provider value={api}>
      {children}

      {/* Global black overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          pointerEvents: isCovering ? "auto" : "none",
          opacity: isCovering ? 1 : 0,
          transition: `opacity ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          zIndex: 9999,
        }}
      />
    </Ctx.Provider>
  );
}
