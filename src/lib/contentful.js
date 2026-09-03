import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// ---- POSTS ----

export async function getAllPosts() {
  const res = await client.getEntries({
    content_type: "post",
    order: "-fields.date",
    include: 2,
  });
  return res.items;
}

export async function getFeaturedPost() {
  const res = await client.getEntries({
    content_type: "post",
    "fields.featuredFlag": true,
    order: "-fields.date",
    limit: 1,
    include: 2,
  });
  return res.items[0] || null;
}

export async function getPostBySlug(slug) {
  const res = await client.getEntries({
    content_type: "post",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });
  return res.items[0] || null;
}

export async function getPostsByCategorySlug(categorySlug) {

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  const res = await client.getEntries({
    content_type: "post",
    "fields.category.sys.id": category.sys.id,
    order: "-fields.date",
    include: 2,
  });
  return res.items;
}

export async function searchPostsByTitle(query) {
  const res = await client.getEntries({
    content_type: "post",
    "fields.title[match]": query,
    include: 2,
  });
  return res.items;
}

// ---- CATEGORIES ----

export async function getAllCategories() {
  const res = await client.getEntries({
    content_type: "category",
  });
  return res.items;
}

export async function getCategoryBySlug(slug) {
  const res = await client.getEntries({
    content_type: "category",
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0] || null;
}

// ---- AUTHORS ----

export async function getAuthorBySlug(slug) {
  const res = await client.getEntries({
    content_type: "author",
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0] || null;
}

// ---- IMAGE HELPER ----

export function optimizeImage(url, { width = 800, quality = 75 } = {}) {
  if (!url) return "";
  const base = url.startsWith("//") ? `https:${url}` : url;
  return `${base}?w=${width}&q=${quality}&fm=webp`;
}

// ---- COMBINED FILTER (search + category together) ----

export async function getFilteredPosts({ query = "", categoryId = "" } = {}) {
  const filters = {
    content_type: "post",
    order: "-fields.date",
    include: 2,
  };

  if (query) filters["fields.title[match]"] = query;
  if (categoryId) filters["fields.category.sys.id"] = categoryId;

  const res = await client.getEntries(filters);
  return res.items;
}

// ---- RELATED POSTS ----

export async function getRelatedPosts(categoryId, excludeSlug, limit = 3) {
  if (!categoryId) return [];

  const res = await client.getEntries({
    content_type: "post",
    "fields.category.sys.id": categoryId,
    "fields.slug[ne]": excludeSlug, // exclude the post we're currently viewing
    order: "-fields.date",
    limit,
    include: 2,
  });
  return res.items;
}