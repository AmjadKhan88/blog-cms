export default function Footer() {
  return (
    <footer className="border-t border-stone-light mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-3 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Fieldnotes. Built by Amjad Ullah.</p>
        <div className="flex gap-4">
          <a href="https://github.com/AmjadKhan88" target="_blank" rel="noreferrer" className="hover:text-neutral-900">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/amjad-ullah-baa484246" target="_blank" rel="noreferrer" className="hover:text-neutral-900">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}