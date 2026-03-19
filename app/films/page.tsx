import { client } from "@/lib/sanity";
import FilmsClient from "./FilmsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const filmsQuery = `*[
  _type == "project" && "films" in tags
] | order(sortOrder asc, year desc){
  _id,
  title,
  year,
  client,
  hoverVideoUrl,
  youtubeUrl,
  sortOrder
}`;

export default async function FilmsPage() {
  const projects = await client.fetch(filmsQuery, {}, { cache: "no-store" });

  return <FilmsClient projects={projects} />;
}