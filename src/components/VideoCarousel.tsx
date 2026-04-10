"use client";

import { Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Video {
  id: string;
  external_id: string;
  title: string;
  platform: string;
  thumbnail_url: string;
  video_url: string;
  published_at: string;
}

export function VideoCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getVideos() {
      try {
        const res = await fetch('/api/videos/sync');
        const json = await res.json();
        if (json.success) {
          setVideos(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setIsLoading(false);
      }
    }
    getVideos();
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!isLoading && videos.length === 0) return null;

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
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mx-6 px-6 lg:-mx-8 lg:px-8 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            // Skeleton Loader
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex-none w-[280px] sm:w-[320px] aspect-[9/16] bg-muted animate-pulse rounded-3xl" />
            ))
          ) : (
            videos.map((video) => (
              <a
                key={video.external_id}
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-none w-[280px] sm:w-[320px] snap-center sm:snap-start bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {/* Thumbnail Container */}
                <div className="aspect-[9/16] relative bg-muted overflow-hidden">
                  {/* Image */}
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-6 h-6 outline outline-transparent fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Platform Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white/95 text-xs font-semibold rounded-full border border-white/20 uppercase tracking-wide">
                      {video.platform === 'youtube' ? 'YT Short' : 'Insta Reel'}
                    </span>
                  </div>
                  
                  {/* Content on Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                    <p className="text-xs text-white/70 mb-2 font-medium tracking-wide uppercase">{formatDate(video.published_at)}</p>
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug line-clamp-3 mb-4 group-hover:text-primary-foreground/90 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-sm font-semibold text-white group-hover:text-white transition-colors">
                      Watch <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
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
