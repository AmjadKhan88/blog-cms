import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { optimizeImage } from "./contentful";

// Renders embedded assets (images dropped directly into the rich text body)
function renderEmbeddedAsset(node) {
  const asset = node.data?.target;
  const url = asset?.fields?.file?.url;
  const title = asset?.fields?.title || "";

  if (!url) return null;

  return (
    <figure className="my-8">
      <img
        src={optimizeImage(url, { width: 900 })}
        alt={title}
        loading="lazy"
        className="w-full"
      />
      {title && (
        <figcaption className="text-xs text-stone mt-2 text-center">{title}</figcaption>
      )}
    </figure>
  );
}

// Renders embedded entries (e.g. a linked Author or Category entry dropped inline)
function renderEmbeddedEntry(node) {
  const entry = node.data?.target;
  const contentType = entry?.sys?.contentType?.sys?.id;

  if (contentType === "author") {
    return (
      <div className="my-8 border border-stone-light p-5 flex items-center gap-4">
        {entry.fields.avatar?.fields?.file?.url && (
          <img
            src={optimizeImage(entry.fields.avatar.fields.file.url, { width: 100 })}
            alt={entry.fields.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-stone mb-0.5">Mentioned</p>
          <p className="font-semibold">{entry.fields.name}</p>
        </div>
      </div>
    );
  }

  // Fallback for any other referenced content type dropped inline
  return (
    <div className="my-6 border-l-2 border-clay pl-4 text-sm text-stone">
      Referenced entry: {entry?.fields?.title || entry?.fields?.name || "Untitled"}
    </div>
  );
}

export const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl font-semibold mt-10 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl font-semibold mt-9 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-xl font-semibold mt-7 mb-3">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-[17px] leading-relaxed text-ink/90 mb-5">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-[17px] text-ink/90">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-[17px] text-ink/90">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-2 border-clay pl-5 my-7 italic text-lg text-ink/80">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-stone-light my-10" />,
    [BLOCKS.EMBEDDED_ASSET]: renderEmbeddedAsset,
    [BLOCKS.EMBEDDED_ENTRY]: renderEmbeddedEntry,
    [INLINES.HYPERLINK]: (node, children) => (
      <a 
        href={node.data.uri}
        target="_blank"
        rel="noreferrer"
        className="text-clay underline decoration-clay/40 underline-offset-2 hover:decoration-clay transition-colors"
      >
        {children}
      </a>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const target = node.data?.target;
      const slug = target?.fields?.slug;
      return slug ? (
        <a href={`/blog/${slug}`} className="text-clay underline underline-offset-2">
          {children}
        </a>
      ) : (
        <span>{children}</span>
      );
    },
  },
  renderMark: {
    // 'code' mark = inline code, e.g. `like this`
    code: (text) => (
      <code className="bg-stone-light px-1.5 py-0.5 rounded text-[15px] font-mono">{text}</code>
    ),
    bold: (text) => <strong className="font-semibold">{text}</strong>,
    italic: (text) => <em>{text}</em>,
  },
};