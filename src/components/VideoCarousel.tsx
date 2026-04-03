"use client";

import { Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Placeholder mock data mimicking Instagram Reels and YouTube Shorts
const VIDEOS = [
  {
    id: "1",
    title: "How I structure my week for maximum clarity and output",
    platform: "Insta Reel",
    thumbnail: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=600&h=1066&auto=format&fit=crop",
    link: "https://instagram.com",
    date: "March 15, 2026",
  },
  {
    id: "2",
    title: "The #1 mistake people make when dating in their 20s",
    platform: "YT Short",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=1066&auto=format&fit=crop",
    link: "https://youtube.com/shorts",
    date: "March 10, 2026",
  },
  {
    id: "3",
    title: "Stop overthinking texting. Use this simple framework.",
    platform: "Insta Reel",
    thumbnail: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600&h=1066&auto=format&fit=crop",
    link: "https://instagram.com",
    date: "February 28, 2026",
  },
  {
    id: "4",
    title: "Setting boundaries without being hostile or aggressive",
    platform: "YT Short",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&h=1066&auto=format&fit=crop",
    link: "https://youtube.com/shorts",
    date: "February 12, 2026",
  },
  {
    id: "5",
    title: "A 3-minute morning habit for building daily resilience",
    platform: "Insta Reel",
    thumbnail: "https://images.unsplash.com/photo-1545228186-068a8dc4e10b?q=80&w=600&h=1066&auto=format&fit=crop",
    link: "https://instagram.com",
    date: "January 30, 2026",
  },
];

export function VideoCarousel() {
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
      className="w-full bg-[#FAFAFA] dark:bg-card border-y border-border/40 py-24 overflow-hidden focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Watch My Most Popular Videos
            </h2>
            <p className="text-lg text-muted-foreground">
              Bite-sized coaching covering relationships, resilience, and personal growth.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll videos left" className="p-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll videos right" className="p-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        {/* We use negative margins (-mx-6) to let the scroll area bleed to the edges of the screen on mobile, while keeping padding so items align with the header */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mx-6 px-6 lg:-mx-8 lg:px-8 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {VIDEOS.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-none w-[280px] sm:w-[320px] snap-center sm:snap-start bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {/* Thumbnail Container (16:9 vertical is exactly 9:16) */}
              <div className="aspect-[9/16] relative bg-muted overflow-hidden">
                {/* Image */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Grandient Overlay for Text Readability - Always visible, darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 outline outline-transparent fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Tags on Top */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white/95 text-xs font-semibold rounded-full border border-white/20 uppercase tracking-wide">
                    {video.platform}
                  </span>
                </div>
                
                {/* Content on Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                  <p className="text-xs text-white/70 mb-2 font-medium tracking-wide uppercase">{video.date}</p>
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug line-clamp-3 mb-4 group-hover:text-primary-foreground/90 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center text-sm font-semibold text-white group-hover:text-white transition-colors">
                    Watch <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* Injecting CSS to hide scrollbar cross-browser */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
