import { Link } from "react-router-dom";
import { optimizeImage } from "../lib/contentful";

export default function PostCard({ post}) {
  const { title, slug, excerpt, coverImage, category, readingTime, date } = post.fields;
  const imgUrl = coverImage?.fields?.file?.url;

  return (
    <Link
      to={`/blog/${slug}`}
      className={`group flex flex-col`}
    >
      <div className={`aspect-[4/3] overflow-hidden bg-stone-light mb-3`}>
        {imgUrl ? (
          <img
            src={optimizeImage(imgUrl, { max: 500 })}
            alt={coverImage?.fields?.title || title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone text-sm">
            No image
          </div>
        )}
      </div>

      {category?.fields?.title && (
        <Link
          to={`/category/${category.fields.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium uppercase tracking-wide mb-1.5 hover:underline w-fit"
          style={{ color: category.fields.color || "#b3552e" }}
        >
          {category.fields.title}
        </Link>
      )}

      <h3 className="font-semibold sm:text-lg leading-snug mb-1.5 group-hover:text-clay transition-colors">
        {title}
      </h3>

      <p className="text-sm text-stone line-clamp-2 mb-2">{excerpt}</p>

      <div className="text-xs text-stone flex gap-2">
        {date && <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
        {readingTime && <span>· {readingTime} min read</span>}
      </div>
    </Link>
  );
}