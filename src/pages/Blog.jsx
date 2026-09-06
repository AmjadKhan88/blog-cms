import { useEffect, useState } from "react";
import { getFilteredPosts, getAllCategories } from "../lib/contentful";
import { useDebounce } from "../hooks/useDebounce";
import PostCard from "../components/PostCard";
import { Search } from "lucide-react";
import Loader from "../components/Loader";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading");

  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

 
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeCategory]);

  useEffect(() => {
    setStatus("loading");
    getFilteredPosts({
      query: debouncedSearch,
      categoryId: activeCategory?.sys.id || "",
      skip: (page - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE,
    })
      .then(({ items, total }) => {
        setPosts(items);
        setTotal(total);
        setStatus("done");
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setStatus("error");
      });
  }, [debouncedSearch, activeCategory, page]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <div className="px-6 py-14">
      <h1 className="text-3xl font-semibold mb-8">All posts</h1>

      <div className="flex gap-2 items-center mb-6 w-full sm:w-96 border border-stone-light bg-white  rounded-none hover:border-clay transition-colors">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search posts by title…"
          className="px-4 py-2.5 text-sm w-full border-0 outline-0"
        />
        <Search width={20} className="mr-2 text-mauve-500"/>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide border transition-colors ${
            !activeCategory
              ? "bg-ink text-paper border-ink"
              : "border-stone-light text-stone hover:border-stone"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.sys.id}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide border transition-colors ${
              activeCategory?.sys.id === cat.sys.id
                ? "text-paper border-transparent"
                : "border-stone-light text-stone hover:border-stone"
            }`}
            style={
              activeCategory?.sys.id === cat.sys.id
                ? { backgroundColor: cat.fields.color || "#b3552e" }
                : undefined
            }
          >
            {cat.fields.title}
          </button>
        ))}
      </div>

      {status === "loading" && <Loader/>}

      {status === "error" && (
        <p className="text-clay-dark text-sm">
          Something went wrong loading posts. Try refreshing.
        </p>
      )}

      {status === "done" && posts.length === 0 && (
        <p className="text-stone text-sm">
          No posts match{debouncedSearch ? ` "${debouncedSearch}"` : ""}
          {activeCategory ? ` in ${activeCategory.fields.title}` : ""}.
        </p>
      )}

      {status === "done" && posts.length > 0 && (
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