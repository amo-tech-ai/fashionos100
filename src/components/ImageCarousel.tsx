
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
  id: number | string;
  image: string;
  title?: string;
  subtitle?: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  aspectRatio?: 'video' | 'square' | 'portrait' | 'landscape';
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  items, 
  aspectRatio = 'landscape',
  className = '' 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  }[aspectRatio];

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // -10 buffer
      
      // Calculate active index based on scroll position
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollButtons);
      // Initial check
      checkScrollButtons();
      return () => el.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: index * clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth rounded-xl py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`min-w-[85%] md:min-w-[45%] snap-center relative overflow-hidden rounded-lg ${aspectRatioClass}`}
          >
            <img 
              src={item.image} 
              alt={item.title || `Slide ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            {/* Overlay Text */}
            {(item.title || item.subtitle) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-0 transition-transform duration-500">
                  {item.subtitle && (
                    <span className="text-fashion-purple text-xs font-bold uppercase tracking-widest mb-2 block">
                      {item.subtitle}
                    </span>
                  )}
                  {item.title && (
                    <h3 className="text-white font-serif text-2xl md:text-3xl font-bold">
                      {item.title}
                    </h3>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Desktop) */}
      <button 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-black hover:bg-white transition-all disabled:opacity-0 disabled:cursor-not-allowed z-10 shadow-lg hidden md:flex`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-black hover:bg-white transition-all disabled:opacity-0 disabled:cursor-not-allowed z-10 shadow-lg hidden md:flex`}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
