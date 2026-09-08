import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getPostBySlug, getRelatedPosts, optimizeImage } from "../lib/contentful";
import { richTextOptions } from "../lib/richTextOptions";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    setPost(null);

    getPostBySlug(slug)
      .then(async (data) => {
        if (!data) {
          setStatus("not-found");
          return;
        }
        setPost(data);
        setStatus("done");
        setRelated(data?.fields?.relatedPosts);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setStatus("error");
      });
  }, [slug]);


  if (status === "loading") {
    return <div className="px-6 py-24 text-center text-stone">Loading post…</div>;
  }

  if (status === "not-found") {
    return <NotFound />;
  }

  if (status === "error") {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-clay-dark font-medium mb-1">Couldn't load this post.</p>
        <p className="text-stone text-sm">Try refreshing the page.</p>
      </div>
    );
  }


  const { title, coverImage, content, author, category, date, readingTime } = post.fields;
  const coverUrl = coverImage?.fields?.file?.url;

  
  return (
    <article className="px-6 py-14 max-w-5xl mx-auto">
      {/* Category badge */}
      {category?.fields?.title && (
        <Link
          to={`/category/${category.fields.slug}`}
          className="inline-block text-xs font-medium uppercase tracking-wide mb-4"
          style={{ color: category.fields.color || "#b3552e" }}
        >
          {category.fields.title}
        </Link>
      )}

      <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-5 max-w-3xl">
        {title}
      </h1>

      {/* Author + meta row */}
      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-stone-light">
        {author?.fields?.avatar?.fields?.file?.url && (
          <img
            src={optimizeImage(author.fields.avatar.fields.file.url, { width: 80 })}
            alt={author.fields.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="text-sm">
          {author?.fields?.name && <p className="font-medium">{author.fields.name}</p>}
          <div className="text-stone text-xs flex gap-2">
            {date && (
              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {readingTime && <span>· {readingTime} min read</span>}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {coverUrl && (
        <div className="mb-10 -mx-6 sm:mx-0">
          <img
            src={optimizeImage(coverUrl, { width: 1200 })}
            alt={title}
            loading="lazy"
            className="w-full sm:aspect-[16/9] object-cover"
          />
        </div>
      )}

      {/* Rich text body */}
      <div className="max-w-4xl">
        {content ? (
          documentToReactComponents(content, richTextOptions)
        ) : (
          <p className="text-stone">This post has no content yet.</p>
        )}
      </div>

      {/* Author bio block */}
      {author?.fields?.bio && (
        <div className="max-w-2xl mt-14 pt-8 border-t border-stone-light flex gap-4">
          {author.fields.avatar?.fields?.file?.url && (
            <img
              src={optimizeImage(author.fields.avatar.fields.file.url, { width: 120 })}
              alt={author.fields.name}
              className="w-14 h-14 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div>
            <p className="text-xs uppercase tracking-wide text-stone mb-1">Written by</p>
            <p className="font-semibold mb-1">{author.fields.name}</p>
            <p className="text-sm text-stone">{author.fields.bio}</p>
          </div>
        </div>
      )}

      {/* Related posts */}
      {related?.length > 0 && (
        <div className="mt-16 pt-10 border-t border-stone-light">
          <p className="text-xs font-medium uppercase tracking-widest text-stone mb-6">
            Related posts
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {related.map((p) => (
              <PostCard key={p.sys.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}