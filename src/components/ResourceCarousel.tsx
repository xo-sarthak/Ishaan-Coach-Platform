"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Clock, Calendar, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Avatar } from "./Avatar";


export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  tag?: string;
  description?: string;
  rating?: string;
  reviewCount?: string;
  duration?: string;
  date?: string;
  authorName?: string;
  authorImage?: string;
  price?: string;
  originalPrice?: string;
}

interface ResourceCarouselProps {
  title: string;
  description?: string;
  items: CarouselItem[];
  viewAllLink?: string;
  viewAllText?: string;
  bgWhite?: boolean;
}

export function ResourceCarousel({
  title,
  description,
  items,
  viewAllLink,
  viewAllText = "View All",
  bgWhite = false,
}: ResourceCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isHovered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered]);

  return (
    <section 
      className={`w-full ${bgWhite ? "bg-card dark:bg-background" : "bg-muted/30 dark:bg-muted/10"} py-12 md:py-16 overflow-hidden relative focus:outline-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-[#2A3B5C]">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-[#2A3B5C]/70 leading-relaxed font-medium">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-6">
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="inline-flex items-center justify-center font-bold text-[#2A3B5C] hover:opacity-70 transition-opacity group"
              >
                {viewAllText} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => scroll("left")} aria-label={`Scroll ${title} left`} className="p-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll("right")} aria-label={`Scroll ${title} right`} className="p-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory flex-nowrap pb-8 pt-4 -mx-6 px-6 lg:-mx-8 lg:px-8 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative flex-none w-[320px] sm:w-[350px] snap-center sm:snap-start bg-white border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1 block flex flex-col focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] sm:aspect-video relative bg-white overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-2"
                  loading="lazy"
                />
                {item.tag && (
                  <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </div>
                )}
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Reviews Row */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    <Star className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    <Star className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    <Star className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    <Star className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground/50">{item.rating || '5.0'} ({item.reviewCount || '0'} Reviews)</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-serif leading-snug line-clamp-2 mb-2 group-hover:opacity-80 transition-opacity text-[#2A3B5C]">
                  {item.title}
                </h3>
                
                {/* Description to fill whitespace */}
                {item.description && (
                  <p className="text-sm text-[#2A3B5C]/70 line-clamp-2 mb-5 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Grouped Footer to prevent weird stretching gaps */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-[11px] font-bold text-foreground/50 uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {item.duration || 'Self-Paced'}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {item.date || 'Ongoing'}</div>
                  </div>

                  <div className="border-t border-border w-full mb-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       {item.authorImage && !item.authorImage.includes('pravatar.cc') ? (
                         <img src={item.authorImage} alt={item.authorName || 'Instructor'} className="w-8 h-8 rounded-full border border-border object-cover" />
                       ) : (
                         <Avatar initials={item.authorName || 'IS'} index={0} className="w-8 h-8" />
                       )}
                       <span className="text-sm font-bold text-[#2A3B5C]">{item.authorName || 'Ishaan Singh'}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      {/* Temporarily hiding original price per user request */}
                      {/* {item.originalPrice && (
                        <span className="text-xs font-bold text-foreground/60 line-through mb-0.5">
                          {item.originalPrice}
                        </span>
                      )} */}
                      <div className="text-lg font-bold text-[#2A3B5C]">{item.price || 'Get'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
