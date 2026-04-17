"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import { VideoCarousel } from "@/components/VideoCarousel";
import { ResourceCarousel, CarouselItem } from "@/components/ResourceCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroNewsletter } from "@/components/HeroNewsletter";
import Link from "next/link";
import { MessageCircle, ArrowRight, PlayCircle, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { COURSES as GLOBAL_COURSES } from "@/data/courses";
import { RESOURCES as GLOBAL_RESOURCES } from "@/data/resources";
import { COHORTS as GLOBAL_COHORTS } from "@/data/cohorts";
import { BOOKS as GLOBAL_BOOKS } from "@/data/books";
import { SOCIAL_LINKS } from "@/data/socials";

// Mapped for the carousel
const COURSES: CarouselItem[] = GLOBAL_COURSES.map(c => ({
  id: c.id,
  title: c.title,
  subtitle: c.subtitle,
  image: c.image,
  link: `/courses/${c.slug}`,
  tag: c.tag,
  description: c.description,
  rating: c.rating || "5.0",
  reviewCount: c.reviewCount,
  duration: c.duration,
  authorName: "Ishaan Singh",
  authorImage: "/images/coach4.png",
  price: c.pricing?.[0]?.price || "Get",
  originalPrice: c.pricing?.[0]?.originalPrice
}));

const COHORTS: CarouselItem[] = GLOBAL_COHORTS.map(c => ({
  id: c.id,
  title: c.title,
  subtitle: c.status === "Waitlist" ? "Waitlist Open" : "Enrollment Open",
  image: c.image,
  link: `/cohorts/${c.slug}`,
  tag: c.tag,
  price: c.price,
  originalPrice: c.originalPrice
}));

const RESOURCES: CarouselItem[] = GLOBAL_RESOURCES.map(r => ({
  id: r.id,
  title: r.title,
  subtitle: r.subtitle,
  image: r.image,
  link: `/resources/${r.slug}`,
  tag: r.tag,
  rating: r.rating,
  reviewCount: r.reviews,
  authorName: "Ishaan Singh",
  authorImage: "/images/coach4.png"
}));

const BOOKS: CarouselItem[] = [
  // Picking one strong book from each category for the homepage
  ...GLOBAL_BOOKS.filter(b => ["prod-1", "money-1", "rel-1", "mind-1", "bio-1", "bio-2"].includes(b.id)).map(b => ({
    id: b.id,
    title: b.title,
    subtitle: `By ${b.author}`,
    image: b.image,
    link: "/book-recommendations",
    tag: b.tag,
    authorName: "Ishaan Singh",
    authorImage: "/images/coach4.png"
  }))
];

const GIFTS: CarouselItem[] = [
  { id: "g1", title: "Premium Mechanical Keyboard", subtitle: "₹12,499+", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Tech" },
  { id: "g2", title: "Noise Cancelling Headphones", subtitle: "₹24,990", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Audio" },
  { id: "g3", title: "The Five Minute Journal", subtitle: "₹2,499", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Mindfulness" },
  { id: "g4", title: "Kindle Paperwhite", subtitle: "₹11,490", image: "https://images.unsplash.com/photo-1620935541604-9844dfbe18e1?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Reading" },
  { id: "g5", title: "Ergonomic Desk Chair", subtitle: "₹16,499", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Workspace" },
  { id: "g6", title: "Aeropress Coffee Maker", subtitle: "₹3,299", image: "https://images.unsplash.com/photo-1589395914619-fa80d7cc5587?q=80&w=600&auto=format&fit=crop", link: "/gift-recommendations", tag: "Kitchen" },
];

export default function Home() {

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section (Anna Coaching Light Theme) */}
      <section id="newsletter" className="w-full bg-background pt-12 md:pt-20 pb-12 overflow-hidden px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 relative"
        >

          {/* Decorative Floating Circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-primary rounded-full mix-blend-multiply opacity-60 z-0 hidden md:block" />
          <div className="absolute -bottom-8 left-1/3 w-32 h-32 bg-primary rounded-full mix-blend-multiply opacity-60 z-0 hidden md:block" />

          {/* Left: Image Container */}
          <div className="flex-1 relative z-10 flex items-center justify-center overflow-hidden">
            <div className="w-full aspect-[4/5] relative rounded-[2.5rem] bg-white border border-border mt-4">
              <Image
                src="/images/hero-ishaan3.png"
                alt="Ishaan Singh"
                fill
                className="object-cover rounded-[2.5rem]"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
              />
            </div>
          </div>

          {/* Right: Content Block */}
          <div className="flex-1 bg-primary rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 overflow-hidden shadow-sm mt-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground mb-4 md:mb-6 leading-tight">
              Life & Relationship <br />Coach
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-8 md:mb-12 max-w-sm leading-relaxed">
              Guidance to Empower Your Journey Toward Balance, Clarity, and Growth.
            </p>

            {/* Integrated Newsletter Form */}
            <HeroNewsletter />
          </div>
        </motion.div>
      </section>



      {/* About The Coach Section */}
      <section className="w-full bg-background py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

          {/* Left: Image Box */}
          <div className="w-full lg:w-5/12 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="/images/about-creator2.jpg"
              alt="Ishaan Singh - Coach"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Content Box */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium w-max mb-6 ring-1 ring-secondary-foreground/10">
              <span className="text-secondary-foreground/60">❖</span> Meet Ishaan
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif text-foreground mb-4 leading-tight">
              A Coach Who Helps You Move from Stuck to Strong
            </h2>

            <div className="text-[#2A3B5C] font-bold text-lg md:text-xl xl:text-xl mb-4 md:mb-6 flex items-center gap-2">
              Life & Relationship Coach <span className="text-primary font-normal">|</span> Mentor
            </div>

            <p className="text-foreground/70 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
              With over 10 years of experience, I've guided hundreds of individuals to rebuild confidence, find clarity in life decisions, and create consistent habits that last. My approach blends empathy, structure, & action so you can see real change—inside & out.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-12">
              <div className="flex items-center gap-4 text-sm text-foreground/80 font-medium">
                Follow me:
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-border pt-8 text-center sm:text-left">
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">10+</div>
                <div className="text-[10px] text-foreground/60 uppercase tracking-widest font-bold">Years of Excellence</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-4">
                <div className="text-3xl font-bold text-foreground mb-1">150+</div>
                <div className="text-[10px] text-foreground/60 uppercase tracking-widest font-bold">Coaching Sessions</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-4">
                <div className="text-3xl font-bold text-foreground mb-1">200K+</div>
                <div className="text-[10px] text-foreground/60 uppercase tracking-widest font-bold">Lives Transformed</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter successfully moved to Hero */}

      {/* Dedicated Courses Section */}
      <ResourceCarousel
        title="Premium Courses"
        description="Self-paced learning to give you extreme clarity on exactly what to do next."
        items={COURSES}
        viewAllLink="/courses"
        viewAllText="Explore all courses"
        bgWhite={false}
      />

      {/* Coaching Sessions Section */}
      <section className="w-full bg-background pb-20 pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with Line */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
            <h2 className="text-2xl font-serif text-foreground">Coaching Sessions</h2>
            <Link href="/book-1-on-1" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-6 py-1.5 rounded-full transition-colors font-medium">
              Book a Session
            </Link>
          </div>

          {/* 4 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1: Life Coaching */}
            <div className="bg-white/80 rounded-2xl border border-border p-5 md:p-6 flex flex-col items-start hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative w-8 h-8 mb-4 md:mb-6">
                <div className="absolute top-0 left-0 w-3 h-3 bg-muted-foreground/30 rounded-sm" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full" />
                <div className="absolute top-2 right-1 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-primary/60 rotate-45" />
              </div>
              <h3 className="font-bold text-lg mb-2 md:mb-3 text-[#2A3B5C]">Life Coaching</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4 md:mb-6 flex-grow">
                Identify your goals, overcome obstacles, and design the life you've always envisioned.
              </p>
              <Link href="/book-1-on-1" className="text-[#2A3B5C] text-sm font-bold inline-flex items-center gap-2">
                Learn More <span className="font-normal text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card 2: Therapy for Stress */}
            <div className="bg-white/80 rounded-2xl border border-border p-6 flex flex-col items-start hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative w-8 h-8 mb-6">
                <div className="absolute top-0 left-0 w-6 h-6 bg-primary rounded-full opacity-80" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#2A3B5C] rounded-full opacity-80" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2A3B5C]">Stress Mastery</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                Our coaching services focus on equipping you with effective tools to build emotional resilience and mental toughness.
              </p>
              <Link href="/book-1-on-1" className="text-[#2A3B5C] text-sm font-bold inline-flex items-center gap-2">
                Learn More <span className="font-normal text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card 3: Leadership Coaching */}
            <div className="bg-white/80 rounded-2xl border border-border p-6 flex flex-col items-start hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative w-8 h-8 mb-6">
                <div className="absolute top-0 left-0 w-5 h-3 bg-[#2A3B5C] opacity-80" />
                <div className="absolute bottom-2 left-2 w-5 h-3 bg-muted-foreground/30" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2A3B5C]">Leadership Coaching</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                Navigating career changes, or enhancing leadership skills, we help you unlock professional success.
              </p>
              <Link href="/book-1-on-1" className="text-[#2A3B5C] text-sm font-bold inline-flex items-center gap-2">
                Learn More <span className="font-normal text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card 4: Love Therapy */}
            <div className="bg-white/80 rounded-2xl border border-border p-6 flex flex-col items-start hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative w-8 h-8 mb-6">
                <div className="absolute top-0 left-1 w-5 h-6 bg-primary rounded-t-full opacity-80" />
                <div className="absolute bottom-0 left-0 w-7 h-2 bg-[#2A3B5C] opacity-80" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#2A3B5C]">Relationship Guidance</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                Learn how to communicate effectively, resolve conflicts, and build deeper connections with those who matter most.
              </p>
              <Link href="/book-1-on-1" className="text-[#2A3B5C] text-sm font-bold inline-flex items-center gap-2">
                Learn More <span className="font-normal text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Hero-style Cohort Section */}
      <section className="w-full bg-card dark:bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />

            <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 mx-auto lg:mx-0">
                <Calendar className="w-4 h-4" /> Waitlist Open
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-tight mb-4 md:mb-6 leading-tight">
                The Life Mastery <br className="hidden md:block" /> Live Cohort
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join a highly vetted group of peers for a multi-week intensive program. Together, we'll build discipline, find career clarity, and forge deep connections.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-4">
                <Link href="/cohorts" className="w-full sm:w-auto inline-flex items-center justify-center rounded-ull bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all rounded-full hover:scale-105">
                  Join the Waitlist
                </Link>
                <div className="flex -space-x-3 sm:ml-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    +2k
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative z-10 hidden lg:block">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img src={COHORTS[0].image} alt="Cohort" className="w-full h-full object-cover" />
              </div>
              {/* Floating aesthetic card */}
              <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl border border-border flex items-center gap-4 animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-lg">4.9/5 Rating</p>
                  <p className="text-sm text-muted-foreground">From 500+ past students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <ResourceCarousel
        title="Free Resources"
        description="Templates, guides, and ebooks to kickstart your journey."
        items={RESOURCES}
        viewAllLink="/resources"
        bgWhite={true}
      />

      <ResourceCarousel
        title="Books I Swear By"
        description="Books that have fundamentally changed the way I look at the world."
        items={BOOKS}
        viewAllLink="/book-recommendations"
        viewAllText="View all books"
        bgWhite={false}
      />

      {/* <ResourceCarousel
        title="Top Gifts"
        description="Practical, high-quality items that make for the perfect gift."
        items={GIFTS}
        viewAllLink="/gift-recommendations"
        viewAllText="View all gifts"
        bgWhite={true}
      /> */}

      {/* Embedded Videos section */}
      <VideoCarousel />
    </div>
  );
}
