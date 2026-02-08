import { client } from "@/lib/sanity";
import DevClient from "./DevClient";

const devQuery = `*[
  _type == "project" && "dev" in tags
] | order(sortOrder asc, year desc){
  _id,
  title,
  year,
  client,
  "hoverImage": hoverImage,
  devLink,
  sortOrder
}`;

export default async function DevPage() {
  const projects = await client.fetch(devQuery);
  return <DevClient projects={projects} />;
}
