import { client } from "@/lib/sanity";
import FilmsClient from "./FilmsClient";

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
  const projects = await client.fetch(filmsQuery);

  return <FilmsClient projects={projects} />;
}
