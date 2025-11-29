import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FBF8F5] px-6 text-center pt-20">
      <FadeIn>
        <div className="text-[12rem] font-serif font-bold text-gray-100 leading-none select-none">
          404
        </div>
        <div className="relative -mt-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fashion-black mb-4">
            Out of Style.
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" className="gap-2">
              <ArrowLeft size={18} /> Return Home
            </Button>
          </Link>
          <Link to="/sitemap">
             <Button variant="outline" size="lg" className="gap-2">
                <Search size={18} /> View Sitemap
             </Button>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};