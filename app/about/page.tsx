import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { aboutQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";

export default async function AboutPage() {
  const about = await client.fetch(aboutQuery);

  if (!about) {
    return (
      <main style={{ padding: 24 }}>
        <p>No About content found in Sanity yet.</p>
        <Link href="/">← Back</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <Link href="/">← Home</Link>
        <strong>About</strong>
      </header>

      <h1 style={{ fontSize: 40, margin: "8px 0 16px" }}>{about.headline ?? "About"}</h1>

      {about.photo && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", marginBottom: 18 }}>
          <Image
            src={urlFor(about.photo).width(1400).height(800).url()}
            alt={about.headline ?? "About photo"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {about.bio && (
        <div style={{ lineHeight: 1.7, fontSize: 16 }}>
          <PortableText value={about.bio} />
        </div>
      )}
    </main>
  );
}
