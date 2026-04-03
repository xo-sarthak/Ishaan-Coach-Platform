"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  tag?: string;
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
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-6">
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="inline-flex items-center justify-center font-medium text-primary hover:text-primary/80 transition-colors group"
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
              className="group relative flex-none w-[280px] sm:w-[320px] snap-center sm:snap-start bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1 block flex flex-col focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] sm:aspect-video relative bg-muted overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                {item.subtitle && (
                  <p className="text-xs text-primary font-bold tracking-wide uppercase mb-2">
                    {item.subtitle}
                  </p>
                )}
                <h3 className="text-xl font-bold leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
