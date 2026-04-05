"use client";

import { useState, useRef, useEffect } from "react";
import { BookOpen, ChevronDown, Filter, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BOOKS } from "@/data/books";

export default function BookRecommendationsPage() {
  const [languageFilter, setLanguageFilter] = useState<"All" | "English" | "Hindi">("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = languageFilter === "All" 
    ? BOOKS 
    : BOOKS.filter(book => book.language === languageFilter);

  const options = [
    { label: "All Languages", value: "All" },
    { label: "English Books", value: "English" },
    { label: "Hindi Classics", value: "Hindi" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-20">
      {/* 1. HEADER HERO */}
      <div className="w-full bg-primary/5 border-b border-border/40 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Books I Personally Recommend
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated list of books that have profoundly shaped my thinking, habits, and life. These are the ones I recommend to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        
        {/* 2. PREMIUM CUSTOM FILTER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Filter className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-foreground/80">Filter Library</span>
            </div>
            
            {/* Custom Dropdown Trigger */}
            <div className="relative w-full sm:w-auto min-w-[240px]" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white dark:bg-card border border-border/60 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight shadow-sm hover:shadow-md transition-all focus:ring-4 focus:ring-primary/10 active:scale-[0.98]"
                >
                    <span>{options.find(o => o.value === languageFilter)?.label}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute top-full left-0 right-0 mt-3 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl overflow-hidden py-2"
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setLanguageFilter(option.value as any);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-6 py-4 text-sm font-bold transition-all text-left group
                                        ${languageFilter === option.value 
                                            ? 'text-primary bg-primary/5' 
                                            : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'}
                                    `}
                                >
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        {option.label}
                                    </span>
                                    {languageFilter === option.value && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* 3. BOOKS GRID */}
        <div className="grid sm:grid-cols-2 gap-10">
          {filteredBooks.map((book) => (
            <div key={book.id} className="flex flex-col bg-card rounded-[2.5rem] border border-border/80 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative">
              
              <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 group-hover:translate-y-[-4px] transition-transform duration-500">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/10">
                    {book.tag}
                  </span>
                  <span className={`px-4 py-1.5 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border ${
                    book.language === "Hindi" 
                    ? "bg-orange-500/80 text-white border-orange-400/20" 
                    : "bg-primary/80 text-white border-primary/20"
                  }`}>
                    {book.language}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3">
                   {book.author}
                </p>
                <h3 className="text-3xl font-extrabold mb-5 tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                    {book.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                  {book.description}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href={book.link}
                    className="group/btn relative inline-flex items-center justify-center w-full overflow-hidden rounded-2xl bg-primary px-8 py-5 text-base font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/30"
                  >
                    <span className="relative z-10">Get the Book</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. EMPTY STATE */}
        {filteredBooks.length === 0 && (
          <div className="py-40 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="w-32 h-32 bg-muted rounded-[3rem] flex items-center justify-center mx-auto mb-8 border border-border/50">
                <BookOpen className="w-16 h-16 text-muted-foreground/20" />
             </div>
             <h3 className="text-3xl font-black mb-4 tracking-tight text-foreground/90">No Recommendations Yet</h3>
             <p className="text-xl text-muted-foreground max-w-md mx-auto">
                We're currently updating our library for this language. Check back soon for new picks!
             </p>
             <button 
                onClick={() => setLanguageFilter("All")}
                className="mt-10 text-primary font-bold hover:underline"
             >
                Show all books instead
             </button>
          </div>
        )}

      </div>
    </div>
  );
}
