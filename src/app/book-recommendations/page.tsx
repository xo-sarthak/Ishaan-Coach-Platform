"use client";

import { useState, useRef, useEffect } from "react";
import { BookOpen, ChevronDown, Filter, Check, Search, Zap, DollarSign, Heart, Brain, User, Globe, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BOOKS, Book } from "@/data/books";

const CATEGORIES = [
  { id: "All", label: "All Books", icon: LayoutGrid },
  { id: "Productivity", label: "Productivity", icon: Zap },
  { id: "Money", label: "Money", icon: DollarSign },
  { id: "Relationships", label: "Relationships", icon: Heart },
  { id: "Mindset", label: "Mindset", icon: Brain },
  { id: "Biographies", label: "Biographies", icon: User },
];

const LANGUAGES = [
  { id: "All", label: "All Languages" },
  { id: "English", label: "English" },
  { id: "Hindi", label: "Hindi" },
];

export default function BookRecommendationsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredBooks = BOOKS.filter(book => {
    const matchesCategory = categoryFilter === "All" || book.category === categoryFilter;
    const matchesLanguage = languageFilter === "All" || book.language === languageFilter;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-20">
      {/* 1. HEADER HERO */}
      <div className="w-full bg-primary/5 border-b border-border/40 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Books I Personally Recommend
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A curated list of books that have profoundly shaped my thinking, habits, and life. These are the ones I recommend to everyone.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        
        {/* 2. PREMIUM FILTERS & SEARCH */}
        <div className="flex flex-col gap-8 mb-16">
          
          {/* Category Tabs (Desktop) / Dropdown (Mobile) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="hidden lg:flex items-center p-1.5 bg-white/50 dark:bg-muted/20 backdrop-blur-md border border-border/40 rounded-2xl gap-1 shadow-sm">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 flex items-center gap-2
                      ${categoryFilter === cat.id 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile/Tablet Category Filter */}
            <div className="lg:hidden relative w-full sm:w-auto min-w-[240px]" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white dark:bg-card border border-border/60 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight shadow-sm hover:shadow-md transition-all focus:ring-4 focus:ring-primary/10 active:scale-[0.98]"
                >
                    <div className="flex items-center gap-3 text-primary">
                      {(() => {
                        const Icon = CATEGORIES.find(c => c.id === categoryFilter)?.icon || LayoutGrid;
                        return <Icon className="w-5 h-5" />;
                      })()}
                      <span>{CATEGORIES.find(c => c.id === categoryFilter)?.label}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-3 z-50 bg-white dark:bg-card backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl overflow-hidden py-2"
                        >
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <button
                                      key={cat.id}
                                      onClick={() => {
                                          setCategoryFilter(cat.id);
                                          setIsDropdownOpen(false);
                                      }}
                                      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all text-left
                                          ${categoryFilter === cat.id 
                                              ? 'text-primary bg-primary/5' 
                                              : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'}
                                      `}
                                  >
                                      <Icon className="w-4 h-4" />
                                      <span>{cat.label}</span>
                                      {categoryFilter === cat.id && <Check className="w-4 h-4 ml-auto text-primary" />}
                                  </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Language Filter */}
            <div className="flex items-center p-1.5 bg-muted/40 border border-border/40 rounded-2xl gap-1">
              <div className="px-3 text-muted-foreground">
                <Globe className="w-4 h-4" />
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguageFilter(lang.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                    ${languageFilter === lang.id 
                      ? "bg-white dark:bg-card text-primary shadow-sm scale-105" 
                      : "text-muted-foreground/60 hover:text-foreground"}
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-card border border-border/60 rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* 3. BOOKS GRID */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBooks.map((book) => (
              <motion.div 
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-card rounded-3xl border border-border/80 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative"
              >
                {/* Physical Book Effect Container */}
                <div className="aspect-[3/4.5] w-full bg-muted relative overflow-hidden group-hover:shadow-inner transition-shadow duration-500">
                  {/* Spine Highlight */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <img
                    src={book.image}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md text-foreground dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-border/40 dark:border-white/10 shadow-sm">
                      {book.tag}
                    </span>
                  </div>

                  {/* Language Tint */}
                  <div className="absolute bottom-6 left-12 z-20">
                    <span className="px-2.5 py-1 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg">
                      {book.language}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex flex-col gap-2 mb-6">
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                      {book.author}
                    </p>
                    <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 font-serif">
                        {book.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {book.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link 
                      href={book.link}
                      className="inline-flex items-center justify-center w-full rounded-2xl bg-primary px-6 py-4 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/40 border border-primary/20"
                    >
                      Get the Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 4. EMPTY STATE */}
        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
             <div className="w-24 h-24 bg-muted rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-border/50">
                <BookOpen className="w-12 h-12 text-muted-foreground/30" />
             </div>
             <h3 className="text-2xl font-black mb-2 tracking-tight">No Books Found</h3>
             <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                We couldn't find any books matching your search or selected category.
             </p>
             <button 
                onClick={() => { setCategoryFilter("All"); setSearchQuery(""); }}
                className="mt-8 text-primary font-bold text-sm hover:underline"
             >
                Reset all filters
             </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
