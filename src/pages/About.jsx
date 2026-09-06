import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="px-6 py-14">
      <p className="text-clay text-xs font-medium uppercase tracking-widest mb-3">About</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-6 max-w-xl">
        Why this blog exists
      </h1>

      <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink/90">
        <p>
          This is a running log of notes on building full-stack products — the kind of
          write-ups I wish existed when I was figuring things out myself. Every post here
          is published and managed through a headless CMS, so the content evolves without
          ever touching the codebase.
        </p>
        <p>
          The site itself was built as a practical exercise in frontend architecture and
          CMS integration — fetching dynamic content at runtime, structuring reusable
          components, and rendering rich content without hardcoding a single post.
        </p>
        <p>
          It's built with React, Tailwind CSS, and Contentful, and deployed on Vercel.
        </p>
      </div>

      <div className="max-w-2xl mt-12 pt-10 border-t border-stone-light">
        <p className="text-xs uppercase tracking-wide text-stone mb-3">Built by</p>
        <h2 className="text-xl font-semibold mb-1">Amjad Ullah</h2>
        <p className="text-stone mb-4">Full-Stack Developer — MERN / Next.js</p>
        <p className="text-[17px] leading-relaxed text-ink/90 mb-5">
          Full-stack developer with experience across the MERN stack, Next.js, TypeScript,
          and AI integrations (Gemini, OpenAI). Builds SaaS products independently, with a
          background including three internships and 10+ shipped projects.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="https://amjad-pro-stack-creations-ov8w.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-clay hover:underline"
          >
            Portfolio
          </a>
          <a 
            href="https://github.com/AmjadKhan88"
            target="_blank"
            rel="noreferrer"
            className="text-clay hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/amjad-ullah-baa484246"
            target="_blank"
            rel="noreferrer"
            className="text-clay hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="max-w-2xl mt-10">
        <Link to="/blog" className="text-sm text-clay hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}