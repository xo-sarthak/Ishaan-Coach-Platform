"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import { VideoCarousel } from "@/components/VideoCarousel";
import { ResourceCarousel, CarouselItem } from "@/components/ResourceCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import Link from "next/link";
import { MessageCircle, ArrowRight, PlayCircle, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { COURSES as GLOBAL_COURSES } from "@/data/courses";
import { RESOURCES as GLOBAL_RESOURCES } from "@/data/resources";
import { COHORTS as GLOBAL_COHORTS } from "@/data/cohorts";
import { BOOKS as GLOBAL_BOOKS } from "@/data/books";

// Mapped for the carousel
const COURSES: CarouselItem[] = GLOBAL_COURSES.map(c => ({
  id: c.id,
  title: c.title,
  subtitle: c.subtitle,
  image: c.image,
  link: `/courses/${c.slug}`,
  tag: c.tag
}));

const COHORTS: CarouselItem[] = GLOBAL_COHORTS.map(c => ({
  id: c.id,
  title: c.title,
  subtitle: c.status === "Waitlist" ? "Waitlist Open" : "Enrollment Open",
  image: c.image,
  link: `/cohorts/${c.slug}`,
  tag: c.tag
}));

const RESOURCES: CarouselItem[] = GLOBAL_RESOURCES.map(r => ({
  id: r.id,
  title: r.title,
  subtitle: r.subtitle,
  image: r.image,
  link: `/resources/${r.slug}`,
  tag: r.tag
}));

const BOOKS: CarouselItem[] = [
  // Picking one strong book from each category for the homepage
  ...GLOBAL_BOOKS.filter(b => ["prod-1", "money-1", "rel-1", "mind-1", "bio-1", "bio-2"].includes(b.id)).map(b => ({
    id: b.id,
    title: b.title,
    subtitle: `By ${b.author}`,
    image: b.image,
    link: "/book-recommendations",
    tag: b.tag
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
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-[1920px] flex justify-center"
        >
          <img
            src="/images/hero-trial3.png"
            alt="Ishaan Singh"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="w-full bg-card dark:bg-background py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-24">

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-6">About the Creator</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a dedicated life and relationship coach helping young adults navigate dating, breakups, career clarity, and long-term improvement.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                My framework is practical, empathetic, and actionable. Over the years, I've helped hundreds of students build a resilient mindset. Now I'm bringing those tools here.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 font-medium text-primary hover:text-muted-foreground transition-colors group">
                Explore my courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="aspect-square bg-muted rounded-[2.5rem] border border-border overflow-hidden relative shadow-2xl group">
              <Image
                src="/images/about-creator.png"
                alt="Ishaan Singh - Creator"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-muted rounded-[2.5rem] border border-border overflow-hidden relative shadow-2xl group order-2 md:order-1">
              <Image
                src="/images/my-philosophy.png"
                alt="My Philosophy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold font-serif tracking-tight mb-6">My Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Awareness is the foundation of growth. I believe that every choice we make should come from a profound place of intention, rather than default patterns.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're struggling to communicate in a relationship or trying to figure out your next career move, my goal is to give you frameworks that cut through the noise and deliver measurable results.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Sunday Insights Newsletter */}
      <NewsletterForm />

      {/* Dedicated Courses Section */}
      <ResourceCarousel
        title="Premium Courses"
        description="Self-paced learning to give you extreme clarity on exactly what to do next."
        items={COURSES}
        viewAllLink="/courses"
        viewAllText="Explore all courses"
        bgWhite={false}
      />

      {/* Hero-style Cohort Section */}
      <section className="w-full bg-card dark:bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />

            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <Calendar className="w-4 h-4" /> Waitlist Open
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tight mb-6 leading-tight">
                The Life Mastery <br className="hidden md:block" /> Live Cohort
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Join a highly vetted group of peers for a multi-week intensive program. Together, we'll build discipline, find career clarity, and forge deep connections.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
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

      {/* Talk With Me CTA Section */}
      <section className="w-full bg-primary py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-primary-foreground mb-6">
            Talk with me directly
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed font-medium">
            Get personalized advice via WhatsApp or use my AI Coach for instant replies. We're here to help you navigate your biggest challenges.
          </p>
          <Link
            href="/talk-with-me"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-bold shadow-xl transition-all hover:bg-white/90 hover:scale-105"
          >
            Start Talking <MessageCircle className="w-5 h-5" />
          </Link>
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

      <ResourceCarousel
        title="Top Gifts"
        description="Practical, high-quality items that make for the perfect gift."
        items={GIFTS}
        viewAllLink="/gift-recommendations"
        viewAllText="View all gifts"
        bgWhite={true}
      />

      {/* Embedded Videos section */}
      <VideoCarousel />
    </div>
  );
}
