"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  Quote,
  Heart,
  Brain,
  Target,
  ShieldCheck,
  Users,
  Briefcase,
  GraduationCap,
  Flame
} from "lucide-react";
import Link from "next/link";

export default function BookOneOnOnePage() {
  const stats = [
    { label: "Lives Transformed", value: "200K+", icon: <Users className="w-5 h-5" /> },
    { label: "Community", value: "130K+", icon: <ShieldCheck className="w-5 h-5" /> },
    { label: "Views", value: "200M+", icon: <Flame className="w-5 h-5" /> },
    { label: "Business Scale", value: "50Cr+", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Excellence", value: "10+ Years", icon: <Target className="w-5 h-5" /> },
    { label: "Academic Root", value: "IIT Grad", icon: <GraduationCap className="w-5 h-5" /> },
  ];

  const testimonials = [
    {
      name: "Sushmit",
      feedback: "Bhai, seriously clarity mil gayi. I was so stuck in my relationship for months, and I couldn't focus on my work. One session with Ishaan and I finally know where I was going wrong.",
      image: "/testimonials/rishab.jpg",
    },
    {
      name: "Shatakshi",
      feedback: "Maine bahut try kiya khud se resolve karne ka, but guidance ki kami thi. Ishaan sir ne problem ko aise simplify kiya ki lag raha tha ye toh kitna simple tha. Safe space feel hota hai baat karte waqt.",
      image: "/testimonials/riya.jpg",
    },
    {
      name: "Sarthak",
      feedback: "Deep knowledge and genuine care. He is not just a coach, he talks like an elder brother who actually wants you to win. 10/10 recommendation if you are feeling lost.",
      image: "/testimonials/sarthak.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-background selection:bg-primary/20">

      {/* 1. HERO SECTION */}
      <section className="w-full relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden bg-card border-b border-border">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-8">
              Private 1:1 Mentorship
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground mb-6 md:mb-8 leading-[1.1]">
              A Safe Space to <br />
              <span className="text-primary italic">Rewrite Your Life.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-10 font-medium">
              Struggling with personal roadblocks or relationship patterns? Let&apos;s talk 1-on-1. No judgment, just pure clarity and a practical roadmap forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#book"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Schedule Call <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Joined by 200K+ others
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold text-foreground/60">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Confidential</div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> Safe Space</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 text-center">
              <img
                src="/images/coach5.jpg"
                alt="Ishaan Singh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white text-left">
                <div className="text-2xl font-serif font-bold mb-1">Ishaan Singh</div>
                <div className="text-sm opacity-80 font-medium tracking-wide">IIT Grad • Founder • Father • Mentor</div>
              </div>
            </div>

            {/* Stats Floating Cards */}
            <div className="absolute -right-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="text-2xl font-black text-primary leading-none">200K+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Lives Changed</div>
            </div>
            <div className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="text-2xl font-black text-[#2A3B5C] leading-none">50Cr+</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">Business Scale</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="w-full py-8 md:py-12 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EMPATHY SECTION - THE SILENT STRUGGLES */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 md:mb-8">
              Why I Open My Calendar to You
            </h2>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-12 md:mb-16 italic font-medium">
              &quot;I know what it feels like to have everything on paper but nothing in your peace.&quot;
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 md:p-10 bg-card rounded-3xl md:rounded-[2.5rem] border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Relationship Friction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether it&apos;s a patterns of heartbreak, lack of communication with your partner, or feeling distant from family—these things drain your energy more than any job ever could. We will strip away the ego and find the core issue.
              </p>
            </div>

            <div className="p-6 md:p-10 bg-card rounded-3xl md:rounded-[2.5rem] border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">The Success Paradox</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are doing well, maybe even winning, but you feel like an impostor. Or worse, you feel empty. We will work on your inner engineering so your mental health matches your bank account.
              </p>
            </div>

            <div className="p-6 md:p-10 bg-card rounded-3xl md:rounded-[2.5rem] border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lack of Hard Direction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Modern life is drowning in choices. Overthinking is the new plague. I help you cut through the noise and build a &quot;default programming&quot; that works for your long-term vision.
              </p>
            </div>

            <div className="p-6 md:p-10 bg-card rounded-3xl md:rounded-[2.5rem] border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">A Judgment-Free Zone</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a father, founder, and mentor, I&apos;ve seen it all. Your darkest thoughts, your biggest fears, and your messiest mistakes are safe here. We focus on the solution, not the shame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="w-full py-24 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 tracking-tight">Real People. Real Change.</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Authentic Conversations (Hinglish)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 rounded-[2rem] border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-10 h-10 text-primary/10 mb-6" />
                  <p className="text-lg leading-relaxed text-foreground italic mb-8 font-medium">
                    &quot;{test.feedback}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{test.name}</span>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOOKING SECTION */}
      <section id="book" className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#2A3B5C] rounded-3xl md:rounded-[3.5rem] p-8 md:p-20 text-center text-white relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(42,59,92,0.4)]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 p-8 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Ready to talk?</h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Choose a session type that suits you. My calendar fills up fast, so please ensure you are ready to commit to the time.
              </p>

              {/* Premium Topmate Redirect Card */}
              <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-white/10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-150 duration-1000" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-16 -mb-16" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 shadow-inner">
                    <Users className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#2A3B5C] mb-4 tracking-tight">
                    Exclusive 1:1 Booking Portal
                  </h3>
                  <div className="flex flex-col items-center mb-10">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl md:text-6xl font-black text-[#2A3B5C]">₹1,499</span>
                      <span className="text-xl md:text-2xl text-[#2A3B5C]/60 line-through font-bold">₹2,499</span>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-primary/20">
                      Limited Time Offer
                    </span>
                  </div>

                  <a
                    href="https://topmate.io/ishaan_live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative bg-[#2A3B5C] text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(42,59,92,0.5)] flex items-center gap-4 active:scale-95"
                  >
                    <span className="relative z-10">Select Your Time Slot</span>
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                  </a>

                  <div className="mt-8 flex items-center gap-2 text-xs font-bold text-[#2A3B5C]/40 uppercase tracking-[0.3em]">
                    <ShieldCheck className="w-4 h-4" />
                    Secure External Checkout
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2.5 hover:text-white/60 transition-colors"><CheckCircle2 className="w-4 h-4 text-primary" /> 1:1 Video Calls</div>
                <div className="flex items-center gap-2.5 hover:text-white/60 transition-colors"><CheckCircle2 className="w-4 h-4 text-primary" /> Action Plan Provided</div>
                <div className="flex items-center gap-2.5 hover:text-white/60 transition-colors"><CheckCircle2 className="w-4 h-4 text-primary" /> Priority Interaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
