import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// posts
export async function getAllPosts() {
  const res = await client.getEntries({
    content_type: "post",
    order: "-fields.date",
    include: 2,
    limit: 10,
  });
  return res.items;
}

export async function getFeaturedPost() {
  const res = await client.getEntries({
    content_type: "post",
    "fields.featuredFlag": true,
    order: "-fields.date",
    limit: 4,
    include: 2,
  });
  return res.items || null;
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

export async function getPostsByCategorySlug(categorySlug, { skip = 0, limit = 6 } = {}) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { items: [], total: 0 };

  const res = await client.getEntries({
    content_type: "post",
    "fields.category.sys.id": category.sys.id,
    order: "-fields.date",
    include: 2,
    skip,
    limit,
  });
  return { items: res.items, total: res.total };
}
export async function searchPostsByTitle(query) {
  const res = await client.getEntries({
    content_type: "post",
    "fields.title[match]": query,
    include: 2,
  });
  return res.items;
}

// category
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

// author
export async function getAuthorBySlug(slug) {
  const res = await client.getEntries({
    content_type: "author",
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0] || null;
}

// image optimization
export function optimizeImage(url, { width = 800, quality = 75 } = {}) {
  if (!url) return "";
  const base = url.startsWith("//") ? `https:${url}` : url;
  return `${base}?w=${width}&q=${quality}&fm=webp`;
}

// search and category 
export async function getFilteredPosts({ query = "", categoryId = "", skip = 0, limit = 6 } = {}) {
  const filters = {
    content_type: "post",
    order: "-fields.date",
    include: 2,
    skip,
    limit,
  };

  if (query) filters["fields.title[match]"] = query;
  if (categoryId) filters["fields.category.sys.id"] = categoryId;

  const res = await client.getEntries(filters);
  return { items: res.items, total: res.total };
}

// related posts
export async function getRelatedPosts(categoryId, excludeSlug, limit = 3) {
  if (!categoryId) return [];

  const res = await client.getEntries({
    content_type: "post",
    "fields.category.sys.id": categoryId,
    "fields.slug[ne]": excludeSlug,
    order: "-fields.date",
    limit,
    include: 2,
  });
  return res.items;
}