"use client";

import useIsMobile from "./useIsMobile";

export default function BackgroundVideo({ src }: { src?: string }) {
  const isMobile = useIsMobile();

  const videoSrc = isMobile
    ? "/videos/wtc.mp4"
    : src;

  if (!videoSrc) return null;

  return (
    <video
      key={videoSrc}
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
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}