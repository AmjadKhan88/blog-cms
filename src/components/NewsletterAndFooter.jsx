import React from 'react';
import { 
  Mail, 
  Send, 
  Sparkles,
} from 'lucide-react';

const NewsletterAndFooter = () => {



  return (
    <section className="relative overflow-hidden">
     
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className=" rounded-3xl p-0 sm:p-8 md:p-12 sm:shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-neutral-700 font-medium">Stay Updated</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black/90 mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-neutral-500 text-sm md:text-base max-w-md">
                Get the latest stories, exclusive content, and updates delivered straight to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 " />
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-full backdrop-blur-sm  text-neutral-500 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:text-orange-500/50 transition-all"
                />
              </div>
              <button className="group bg-white text-slate-900 px-6 py-3.5 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

       
        
      </div>
    </section>
  );
};

export default NewsletterAndFooter;