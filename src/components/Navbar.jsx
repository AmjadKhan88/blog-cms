import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import { Home, Newspaper, Dumbbell, Cpu, Heart, Search, Menu, X, SquareText } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/blog', name: 'Blogs', icon: SquareText },
    { path: '/category/news', name: 'News', icon: Newspaper },
    { path: '/category/sports', name: 'Sports', icon: Dumbbell },
    { path: '/category/technology', name: 'Technology', icon: Cpu },
    { path: '/category/health', name: 'Health', icon: Heart },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className=" border-b border-stone-light bg-paper backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-2">
            <Link to="/" className="font-semibold text-lg lg:text-xl tracking-tight">
              Field<span className="text-[#b3552e]">notes</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 ease-out
                    ${isActive
                      ? 'bg-[#b3552e]/10 text-[#b3552e] font-semibold'
                      : 'text-slate-700 hover:bg-[#b3552e]/10 hover:text-slate-900'
                    }
                    hover:scale-105 active:scale-95
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#b3552e]' : 'text-slate-500'}`} />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=> navigate("/blog")} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`
          md:hidden fixed left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-slate-200/60
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            return (
              <button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  navigate(item.path);
                }}
                className={`
                  flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-[#b3552e]/10 text-[#b3552e] border-l-4 border-[#b3552e]'
                    : 'text-slate-700 hover:bg-[#b3552e]/10'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#b3552e]' : 'text-slate-500'}`} />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

