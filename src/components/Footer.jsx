import { 
  MapPin, 
  Phone, 
  Clock,
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Heart
} from 'lucide-react';
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

import {Link} from "react-router-dom"
export default function Footer() {
  const location = useLocation();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  const categories = [
    { name: 'Technology', href: '/category/technology' },
    { name: 'Health', href: '/category/health' },
    { name: 'Sports', href: '/category/sports' },
    { name: 'News', href: '/category/news' },
  ];



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <footer className="border-t border-stone-light px-2 sm:px-5 md:px-6 mt-20 max-w-7xl mx-auto">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                BlogFlow
              </span>
              <div className="h-6 w-px" />
              <span className="text-xs ">Est. 2026</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Your trusted source for curated content across technology, health, sports, and news. 
              We bring you stories that matter.
            </p>
            
            
          </div>

          <div>
            <h4 className="text-neutral-500 font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-clay" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-neutral-500 text-sm transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-500 font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-clay" />
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href} 
                    className="text-neutral-500 text-sm transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-500 font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-clay" />
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-neutral-500">
                <MapPin className="w-4 h-4 text-clay mt-0.5 flex-shrink-0" />
                <span>123 Blog Street, Peshawar, DC 10001</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <Phone className="w-4 h-4 text-clay flex-shrink-0" />
                <span>+92 3069534618</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <Clock className="w-4 h-4 text-clay flex-shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 text-neutral-500">
                <Users className="w-4 h-4 text-clay" />
                <span>Join 1,000+ subscribers</span>
              </div>
            </div>
          </div>
        </div>


      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col border-t border-stone-light mt-3  sm:flex-row justify-between gap-3 text-sm text-neutral-500">
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