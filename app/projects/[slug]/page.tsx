import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { projectBySlugQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";

type Params = { slug: string };

// Works whether Next gives params as an object OR a Promise
type PageProps = {
  params: Params | Promise<Params>;
};

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) {
    return (
      <main style={{ padding: 24 }}>
        <p>Missing slug param.</p>
        <Link href="/">← Back</Link>
      </main>
    );
  }

  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    return (
      <main style={{ padding: 24 }}>
        <p>Project not found.</p>
        <Link href="/">← Back</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link href="/" style={{ display: "inline-block", marginBottom: 16 }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: 40, margin: "8px 0" }}>{project.title}</h1>

      {project.coverImage && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          <Image
            src={urlFor(project.coverImage).width(1400).height(800).url()}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {project.description && (
        <div style={{ lineHeight: 1.7, fontSize: 16 }}>
          <PortableText value={project.description} />
        </div>
      )}
    </main>
  );
}
