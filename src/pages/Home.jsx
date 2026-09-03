import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedPost, getAllPosts, optimizeImage } from "../lib/contentful";
import PostCard from "../components/PostCard";

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        const [featuredPost, allPosts] = await Promise.all([
          getFeaturedPost(),
          getAllPosts(),
        ]);
        setFeatured(featuredPost);
        setPosts(allPosts);
        setStatus("done");
      } catch (err) {
        console.error("Failed to load home page content:", err);
        setStatus("error");
      }
    }
    load();
  }, []);

  if (status === "loading") {
    return <div className="px-6 py-24 text-center text-stone">Loading posts…</div>;
  }

  if (status === "error") {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-clay-dark font-medium mb-1">Couldn't load the blog.</p>
        <p className="text-stone text-sm">Check your Contentful credentials and try refreshing.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="px-6 py-24 text-center text-stone">
        No posts published yet. Check back soon.
      </div>
    );
  }

  // Latest posts grid excludes the featured post so it isn't shown twice
  const latestPosts = featured
    ? posts.filter((p) => p.sys.id !== featured.sys.id)
    : posts;

  return (
    <div className="px-6">
      {/* Hero */}
      <section className="py-14 sm:py-20 max-w-2xl">
        <p className="text-clay text-sm font-medium uppercase tracking-widest mb-3">
          Notes on building things
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-4">
          Long-form thoughts on code, product, and shipping.
        </h1>
        <p className="text-stone text-lg">
          A running log of what I'm learning while building full-stack products —
          written in public, updated whenever something's worth writing down.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="mb-16 pb-16 border-b border-stone-light">
          <p className="text-xs font-medium uppercase tracking-widest text-stone mb-4">
            Featured
          </p>
          <Link
            to={`/blog/${featured.fields.slug}`}
            className="group grid sm:grid-cols-2 gap-6 sm:gap-10 items-center"
          >
            <div className="aspect-[4/3] overflow-hidden bg-stone-light">
              {featured.fields.coverImage?.fields?.file?.url && (
                <img
                  src={optimizeImage(featured.fields.coverImage.fields.file.url, { width: 800 })}
                  alt={featured.fields.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              )}
            </div>
            <div>
              {featured.fields.category?.fields?.title && (
                <span
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: featured.fields.category.fields.color || "#b3552e" }}
                >
                  {featured.fields.category.fields.title}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-semibold mt-2 mb-3 group-hover:text-clay transition-colors">
                {featured.fields.title}
              </h2>
              <p className="text-stone mb-3">{featured.fields.excerpt}</p>
              <div className="text-xs text-stone">
                {featured.fields.readingTime && `${featured.fields.readingTime} min read`}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest posts grid */}
      <section className="pb-20">
        <p className="text-xs font-medium uppercase tracking-widest text-stone mb-6">
          Latest posts
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {latestPosts.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}