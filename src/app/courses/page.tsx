"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Calendar, Star, Search } from "lucide-react";
import { COURSES } from "@/data/courses";

// Get unique tags
const allTags = Array.from(new Set(COURSES.map(c => c.tag).filter(Boolean)));
const filters = ["All", ...allTags];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter(course => {
    const matchesFilter = activeFilter === "All" || course.tag === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-border text-[#2A3B5C]/60 text-sm font-bold mb-6 uppercase tracking-wider">
            Our Courses
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#2A3B5C] font-bold mb-6 max-w-4xl leading-tight">
            Courses Designed for a Fast-Changing World
          </h1>
          <p className="text-lg text-[#2A3B5C]/70 max-w-3xl leading-relaxed mx-auto">
            Stay ahead with self-paced, high ROI courses designed to solve specific problems in your relationships, career, and life strategies. Dive into courses crafted for actual results.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-secondary text-[#2A3B5C] shadow-sm transform scale-105' 
                    : 'bg-white border border-border text-[#2A3B5C]/60 hover:border-[#2A3B5C]/30 hover:text-[#2A3B5C]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 shrink-0 min-w-[280px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A3B5C]/40" />
            <input 
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border/60 rounded-full pl-12 pr-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2A3B5C]/10 transition-all shadow-sm text-[#2A3B5C] placeholder:text-[#2A3B5C]/30"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course) => {
            const price = course.pricing?.[0]?.price || 'Get';

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group relative bg-white border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 flex flex-col hover:-translate-y-1 no-underline"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative bg-white overflow-hidden mx-3 mt-3 rounded-2xl border border-border/10 flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-3"
                    loading="lazy"
                  />
                  {course.tag && (
                    <div className="absolute top-3 left-3 bg-secondary text-[#2A3B5C] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                      {course.tag}
                    </div>
                  )}
                </div>

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
                    <span className="text-[11px] font-bold text-foreground/50">{course.rating || '5.0'} ({course.reviewCount} Reviews)</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif leading-snug line-clamp-2 mb-2 group-hover:opacity-80 transition-opacity text-[#2A3B5C]">
                    {course.title}
                  </h3>

                  {course.description && (
                    <p className="text-sm text-[#2A3B5C]/70 line-clamp-2 mb-5 leading-relaxed">
                      {course.description}
                    </p>
                  )}

                  {/* Grouped Footer to prevent weird stretching gaps */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-[11px] font-bold text-foreground/50 uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {course.duration || 'Self-Paced'}</div>
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Ongoing</div>
                    </div>

                    <div className="border-t border-border w-full mb-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <img src={"/images/about-creator.png"} alt={"Ishaan Singh"} className="w-8 h-8 rounded-full border border-border object-cover" />
                         <span className="text-sm font-bold text-[#2A3B5C]">Ishaan Singh</span>
                      </div>
                      <div className="flex flex-col items-end">
                        {/* Temporarily hiding original price per user request */}
                        {/* {course.pricing?.[0]?.originalPrice && (
                          <span className="text-xs font-bold text-foreground/60 line-through mb-0.5">
                            {course.pricing[0].originalPrice}
                          </span>
                        )} */}
                        <div className="text-lg font-bold text-[#2A3B5C]">{price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* End of Grid */}

      </div>
    </div>
  );
}
