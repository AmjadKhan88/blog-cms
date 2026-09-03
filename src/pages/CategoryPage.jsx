import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryBySlug, getPostsByCategorySlug } from "../lib/contentful";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    setCategory(null);
    setPosts([]);

    async function load() {
      try {
        const cat = await getCategoryBySlug(slug);
        if (!cat) {
          setStatus("not-found");
          return;
        }
        setCategory(cat);

        const categoryPosts = await getPostsByCategorySlug(slug);
        setPosts(categoryPosts);
        setStatus("done");
      } catch (err) {
        console.error("Failed to load category:", err);
        setStatus("error");
      }
    }

    load();
  }, [slug]);

  if (status === "loading") {
    return <div className="px-6 py-24 text-center text-stone">Loading…</div>;
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
        {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
      </p>

      {posts.length === 0 ? (
        <p className="text-stone text-sm">No posts published in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {posts.map((post) => (
            <PostCard key={post.sys.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}