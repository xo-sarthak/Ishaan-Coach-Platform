"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  vimeoId?: string;
  thumbnail: string;
  title: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ videoUrl, vimeoId, thumbnail, title, autoPlay = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Clean the YouTube URL to ensure it's in embed format and has autoplay
  const getEmbedUrl = (url: string) => {
    let cleanUrl = url;
    if (!url.includes("embed")) {
      const id = url.split("v=")[1]?.split("&")[0];
      if (id) {
         cleanUrl = `https://www.youtube.com/embed/${id}`;
      }
    }
    return `${cleanUrl}${cleanUrl.includes("?") ? "&" : "?"}autoplay=1&mute=${autoPlay ? '1' : '0'}&rel=0&modestbranding=1&showinfo=0`;
  };

  if (isPlaying) {
    const [id, hash] = (vimeoId || "").split("/");
    const vimeoSrc = `https://player.vimeo.com/video/${id}?autoplay=1&muted=${autoPlay ? '1' : '0'}&title=0&byline=0&portrait=0&dnt=1${hash ? `&h=${hash}` : ""}`;

    return (
      <div className="w-full aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-border animate-in fade-in zoom-in duration-500">
        {vimeoId ? (
          <iframe
            src={vimeoSrc}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full border-0"
          />
        ) : videoUrl ? (
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full border-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            Video unavailable
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="group relative w-full aspect-video rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-border transition-all duration-500 hover:scale-[1.01] hover:shadow-primary/20 bg-muted"
      onClick={() => setIsPlaying(true)}
    >
      <img 
        src={thumbnail} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center transition-all duration-500 group-hover:bg-black/30">
        <div className="relative flex items-center justify-center translate-y-0 transition-transform duration-500 group-hover:-translate-y-2">
            {/* Pulsing ring */}
            <div className="absolute inset-[-20px] rounded-full bg-primary/20 animate-pulse transition-opacity duration-500 group-hover:opacity-0" />
            
            {/* Main glass button */}
            <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:shadow-[0_0_80px_rgba(var(--primary),0.4)]">
                <Play className="w-10 h-10 text-white fill-white ml-1.5 transition-all duration-500 group-hover:scale-110" />
            </div>
        </div>
      </div>

      {/* Intro Badge */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-end transition-all duration-500 sm:group-hover:bottom-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base font-bold tracking-tight shadow-xl whitespace-nowrap">
             Watch Preview
          </div>
          <div className="hidden sm:block bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 text-[10px] text-white/80 font-mono uppercase tracking-[0.2em]">
             4K High Fidelity
          </div>
      </div>
    </div>
  );
}
