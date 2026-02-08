export const settingsQuery = `*[_type == "siteSettings"][0]{
  title, tagline, heroImage, social
}`;

export const projectsQuery = `*[_type == "project"] | order(year desc){
  title, slug, year, client, tags, coverImage, featured
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, year, client, tags, coverImage, gallery, description, link
}`;

export const aboutQuery = `*[_type == "about"][0]{ headline, photo, bio }`;
