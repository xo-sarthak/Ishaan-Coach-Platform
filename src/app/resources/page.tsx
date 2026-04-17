"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { RESOURCES } from "@/data/resources";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-border text-[#2A3B5C]/60 text-sm font-bold mb-6 uppercase tracking-wider">
              Free Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2A3B5C] font-bold mb-6 tracking-tight leading-tight">
              Tools to Accelerate Your Growth
            </h1>
            <p className="text-lg text-[#2A3B5C]/70 leading-relaxed">
              Actionable frameworks, templates, and guides designed specifically to give you clarity and direction immediately.
            </p>
          </div>

          <div className="relative w-full md:w-80 mb-2 shrink-0 min-w-[280px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A3B5C]/40" />
            <input 
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border/60 rounded-full pl-12 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2A3B5C]/10 transition-all shadow-sm text-[#2A3B5C] placeholder:text-[#2A3B5C]/30"
            />
          </div>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((resource) => (
           <Link key={resource.id} href={`/resources/${resource.slug}`} className="group block bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 no-underline">
             <div className="aspect-video w-full bg-white relative flex items-center justify-center overflow-hidden border-b border-border/10">
               <img src={resource.image} alt={resource.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-3" loading="lazy" />
             </div>
             <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
               {resource.subtitle && <span className="text-[#2A3B5C]/60 text-xs font-bold tracking-wider uppercase mb-2 block">{resource.subtitle}</span>}
               <h3 className="text-2xl font-serif text-[#2A3B5C] font-bold mb-4 line-clamp-2 leading-snug group-hover:opacity-80 transition-opacity">{resource.title}</h3>
               <div className="mt-auto flex items-center text-sm font-bold text-[#2A3B5C]/50 group-hover:text-[#2A3B5C] transition-colors">
                 Download Now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
           </Link>
        ))}
      </div>
      </div>
    </div>
  );
}
