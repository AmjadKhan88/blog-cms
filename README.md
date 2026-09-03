# TechBlogs

A fully dynamic blogging platform built with React and Contentful — no hardcoded content, all posts/authors/categories managed through a headless CMS.

**Live site:** [your-vercel-url]
**Repo:** https://github.com/AmjadKhan88/your-repo-name

## Tech Stack

- React.js (Vite)
- Tailwind CSS v4
- Contentful (Headless CMS)
- React Router
- Contentful Rich Text renderer (for embedded images/entries)

## Features

- Home page with hero, featured post, and latest posts grid
- Blog listing with search-by-title and category filtering
- Single post page with rich text rendering, author bio, related posts
- Category pages
- Custom 404 page
- Fully responsive, lazy-loaded images via Contentful's Image API

## Running Locally

1. Clone the repo
   \`\`\`
   git clone https://github.com/AmjadKhan88/your-repo-name.git
   cd your-repo-name
   npm install
   \`\`\`

2. Create a \`.env\` file in the root (see \`.env.example\`) with:
   \`\`\`
   VITE_CONTENTFUL_SPACE_ID=your_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
   \`\`\`

3. Run the dev server
   \`\`\`
   npm run dev
   \`\`\`

## Content Model (Contentful)

**Author** — name, slug, avatar, bio
**Category** — title, slug, color
**Post** — title, slug, excerpt, coverImage, content, author (ref), category (ref), date, readingTime, featuredFlag

## Project Structure

\`\`\`
src/
  lib/contentful.js       — single dedicated file for all Contentful API calls
  components/             — Navbar, Footer, Layout, PostCard
  pages/                  — Home, Blog, PostDetail, CategoryPage, NotFound
  hooks/useDebounce.js    — debounced search input
\`\`\`