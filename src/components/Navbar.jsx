import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
    }`;

  return (
    <header className="border-b border-stone-light bg-paper">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          Fieldnotes
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/blog" className={linkClass}>
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}