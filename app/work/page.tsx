import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

type PageProps = {
  searchParams?: { tag?: string };
};

const workQuery = `*[
  _type == "project" && ($tag == "" || $tag in tags)
] | order(year desc){
  title,
  slug,
  year,
  client,
  tags,
  coverImage
}`;

export default async function WorkPage({ searchParams }: PageProps) {
  const tag = searchParams?.tag ?? ""; // ALWAYS provide a value
  const projects = await client.fetch(workQuery, { tag } as Record<string, string>);

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 40, margin: 0 }}>{tag ? tag.toUpperCase() : "WORK"}</h1>
          <p style={{ opacity: 0.7, marginTop: 8 }}>
            {tag ? `Showing projects tagged “${tag}”.` : "All projects."}
          </p>
        </div>
        <Link href="/" style={{ textDecoration: "none" }}>
          ← Home
        </Link>
      </header>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "18px 0 22px" }}>
        <Pill href="/work?tag=films" active={tag === "films"}>Films</Pill>
        <Pill href="/work?tag=dev" active={tag === "dev"}>Dev</Pill>
        <Pill href="/work?tag=design" active={tag === "design"}>Design</Pill>
        <Pill href="/work" active={!tag}>All</Pill>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {projects?.map((p: any) => (
          <Link
            key={p.slug.current}
            href={`/projects/${p.slug.current}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #eee",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {p.coverImage && (
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <Image
                  src={urlFor(p.coverImage).width(1200).height(675).url()}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>{p.title}</strong>
                <span style={{ opacity: 0.6 }}>{p.year}</span>
              </div>
              {p.client ? <div style={{ opacity: 0.75, marginTop: 6 }}>{p.client}</div> : null}
              {p.tags?.length ? (
                <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.slice(0, 3).map((t: string) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        padding: "3px 8px",
                        border: "1px solid #ddd",
                        borderRadius: 999,
                        opacity: 0.85,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

function Pill({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #ddd",
        padding: "6px 10px",
        borderRadius: 999,
        opacity: active ? 1 : 0.65,
        background: active ? "rgba(0,0,0,0.04)" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}
