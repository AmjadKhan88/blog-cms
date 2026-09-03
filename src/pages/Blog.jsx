import { useEffect, useState } from "react";
import { getFilteredPosts, getAllCategories } from "../lib/contentful";
import { useDebounce } from "../hooks/useDebounce";
import PostCard from "../components/PostCard";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(null); // holds category entry
  const [status, setStatus] = useState("loading");

  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  useEffect(() => {
    setStatus("loading");
    getFilteredPosts({
      query: debouncedSearch,
      categoryId: activeCategory?.sys.id || "",
    })
      .then((data) => {
        setPosts(data);
        setStatus("done");
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setStatus("error");
      });
  }, [debouncedSearch, activeCategory]);

  return (
    <div className="px-6 py-14">
      <h1 className="text-3xl font-semibold mb-8">All posts</h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search posts by title…"
          className="w-full sm:w-96 border border-stone-light bg-white px-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-clay transition-colors"
        />
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

      {status === "loading" && (
        <p className="text-stone text-sm">Loading…</p>
      )}

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {posts.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}