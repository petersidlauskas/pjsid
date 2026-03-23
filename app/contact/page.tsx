import Link from "next/link";
import FloatingModel from "../components/FloatingModel";
import BackgroundVideo from "../components/BackgroundVideo";

export default function ContactPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "black" }}>
      {/* 3D background (cannot block clicks) */}
      <BackgroundVideo />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none", // ✅ lets clicks pass through
        }}
      >
        <FloatingModel url="/models/model.glb" scale={0.32} />
      </div>

      {/* Page content */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          padding: "40px",
          maxWidth: "700px",
          color: "white",
        }}
      >
        <Link href="/" style={{ display: "inline-block", marginBottom: "30px", color: "white" }}>
          ← Home
        </Link>

        <h1 style={{ fontSize: "24px", fontFamily:"Neue Haas Bold", marginBottom: "30px", color:"yellow" }}>Contact</h1>

        <div style={{ fontSize: "12px", lineHeight: "2", color: "rgba(255,255,255,0.85)", letterSpacing: 1 }}>
          <p>
            Email:{" "}
            <a href="mailto:info@pjsid.com" style={{ color: "white", textDecoration: "underline" }}>
              info@pjsid.com
            </a>
          </p>

          <p>
            Instagram:{" "}
            <a
              href="https://instagram.com/solojazz"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              @solojazz
            </a>
          </p>

          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/peter-sidlauskas/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              https://www.linkedin.com/in/peter-sidlauskas/
            </a>
          </p>

          <p>
            GitHub:{" "}
            <a
              href="https://github.com/petersidlauskas"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              https://github.com/petersidlauskas
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}