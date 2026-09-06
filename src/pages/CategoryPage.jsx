import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryBySlug, getPostsByCategorySlug } from "../lib/contentful";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";
import Loader from "../components/Loader";

const POSTS_PER_PAGE = 6;

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setPage(1);
  }, [slug]);

  useEffect(() => {
    setStatus("loading");

    async function load() {
      try {
        const cat = await getCategoryBySlug(slug);
        if (!cat) {
          setStatus("not-found");
          return;
        }
        setCategory(cat);

        const { items, total } = await getPostsByCategorySlug(slug, {
          skip: (page - 1) * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
        });
        setPosts(items);
        setTotal(total);
        setStatus("done");
      } catch (err) {
        console.error("Failed to load category:", err);
        setStatus("error");
      }
    }

    load();
  }, [slug, page]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  if (status === "loading") {
    return <Loader/>;
  }

  if (status === "not-found") {
    return <NotFound />;
  }

  if (status === "error") {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-clay-dark font-medium mb-1">Couldn't load this category.</p>
        <p className="text-stone text-sm">Try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-14">
      <p
        className="text-xs font-medium uppercase tracking-widest mb-2"
        style={{ color: category.fields.color || "#b3552e" }}
      >
        Category
      </p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">{category.fields.title}</h1>
      <p className="text-stone mb-10">
        {total} {total === 1 ? "post" : "posts"} in this category
      </p>

      {posts.length === 0 ? (
        <p className="text-stone text-sm">No posts published in this category yet.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">
            {posts.map((post) => (
              <PostCard key={post.sys.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 text-sm text-stone disabled:opacity-30 disabled:cursor-not-allowed hover:text-ink transition-colors"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 text-sm border transition-colors ${
                    p === page
                      ? "bg-ink text-paper border-ink"
                      : "border-stone-light text-stone hover:border-stone"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 text-sm text-stone disabled:opacity-30 disabled:cursor-not-allowed hover:text-ink transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}