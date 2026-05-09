"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Target, TrendingUp, Users, Shield, ArrowDown } from "lucide-react";

export default function CreatorGrowthPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    followerCount: "",
    profession: "",
    challenge: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/creator-growth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-x-hidden w-full max-w-full pb-24 pt-12 md:pt-24">

      {/* Background Ambience (Brand Compliant) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/30 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative pt-16 md:pt-24 pb-16 px-4 md:px-6 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 border border-feature-bg/10 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-feature-bg animate-pulse" />
              For Working Professionals
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Next Batch Starts: June 2026
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Scale your <span className="italic text-feature-bg">Instagram presence</span><br className="hidden md:block" /> without losing your life.
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-10">
            For creators with <strong className="text-foreground">less than 20,000 followers</strong> who are tired of the content treadmill. Learn the exact systems I used to scale a high-trust brand while balancing a career and family.
          </p>

          <button
            onClick={scrollToForm}
            className="group h-14 md:h-16 px-8 bg-foreground hover:bg-foreground/90 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Apply for the Waitlist <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </section>

        {/* COHORT HIGHLIGHTS BAR */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mb-16 relative z-10">
          <div className="bg-white rounded-[2rem] border border-border p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { label: "COHORT DURATION", val: "4 Weeks Intensive" },
                { label: "LEARNING COMMITMENT", val: "2 Hours / Week" },
                { label: "SESSION FORMAT", val: "Live Mentorship & Q&A" },
                { label: "TARGET AUDIENCE", val: "Under 20K Followers" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="text-center flex flex-col justify-center items-center border-b border-border/40 last:border-b-0 pb-6 last:pb-0 md:border-b-0 md:pb-0 md:border-l md:border-border/40 md:pl-4 first:md:border-l-0 first:md:pl-0"
                >
                  <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] block mb-2">{item.label}</span>
                  <span className="text-base md:text-lg font-sans font-semibold tracking-tight text-foreground">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE MENTOR / RELATABILITY SECTION */}
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-border/50">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="order-2 md:order-1 relative">
              <div className="aspect-[4/5] md:aspect-[3/4] bg-muted/50 rounded-[2.5rem] overflow-hidden relative border border-border shadow-lg group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/40 gap-4">
                  <div className="w-16 h-16 rounded-full border border-dashed border-foreground/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-foreground/30" />
                  </div>
                  <span className="font-bold tracking-widest uppercase text-[10px]">Add Image Here</span>
                </div>
                {/* Standard image tag placeholder */}
                <img
                  src="/ishaan-creator.jpg"
                  alt="Ishaan Singh"
                  className="absolute inset-0 w-full h-full object-cover object-[35%_center]"
                />
              </div>

              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-10 bg-white p-4 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl shadow-foreground/5 border border-border">
                <div className="text-2xl md:text-4xl font-sans font-extrabold tracking-tight text-foreground">20M+</div>
                <div className="text-[9px] md:text-[10px] font-bold text-feature-bg uppercase tracking-[0.2em] mt-1 md:mt-2">Monthly Views</div>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 border border-feature-bg/10 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                Who is Ishaan Singh?
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                An IIT Graduate, Startup Founder, and Father Who Conquered the Struggle.
              </h2>

              <div className="space-y-6 text-foreground/70 leading-relaxed text-sm md:text-base">
                <p>
                  Ishaan Singh is an <strong>IIT Kanpur MBA</strong> and business leader who built a <strong>₹50 Crore+ business</strong>. But his journey wasn't about having endless hours to create content—it was born out of intense time constraints and relentless daily struggles.
                </p>
                <p>
                  While <strong>running his own high-pressure startup</strong> and <strong>raising a 1-year-old kid</strong>, Ishaan faced the exact same burnout and time crises that you face. He had zero space for standard "Instagram advice" that tells you to treat content creation like another 24/7 shift or spend hours filming reels.
                </p>
                <p>
                  To conquer this, he designed a ruthless, high-leverage system. He committed <strong>only 2 hours per week</strong> to Instagram. Under this strict constraint, he successfully built, launched, and scaled his page to over <strong>130,000 followers in less than 12 months</strong>.
                </p>
                <p className="italic text-foreground font-medium border-l-2 border-feature-bg pl-4 py-2.5 bg-feature-bg/5 rounded-r-xl">
                  "Most gurus tell you to make content your full-time job. I'm living proof that with the right systems, just 2 hours a week is all you need to build a high-trust, high-growth Instagram presence from scratch."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "IIT Kanpur MBA",
                  "Built a ₹50 Crore+ Business",
                  "Husband & Father",
                  "130K+ Followers"
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-feature-bg" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{stat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* THE PROBLEM & OPPORTUNITY */}
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                  You don't have a big audience yet.<br /> <span className="text-foreground/40">And you definitely don't have the time to build one.</span>
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Recognition & Financial Aspirations", desc: "You want to build high-trust professional recognition, generate income, and open doors for business interest, but you are currently starting from scratch or stuck at low numbers." },
                  { title: "The Time Management Crisis", desc: "Traditional 'Instagram advice' demands filming hours of reels and being glued to your phone. As a busy professional, you cannot trade your limited hours for single-digit views." },
                  { title: "Hard Work vs. Smart Work", desc: "You're burning out chasing random algorithm trends instead of using high-leverage, structured frameworks that convert casual visitors into high-trust professional followers." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-border shadow-sm">
                    <div className="mt-1 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                      <Target className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">{item.title}</h4>
                      <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/40 border border-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden order-1 lg:order-2">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Shield className="w-48 h-48 text-feature-bg" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-center mb-8">
                  <TrendingUp className="w-6 h-6 text-feature-bg" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">Build & Scale From Scratch</h3>
                <p className="text-foreground/70 leading-relaxed mb-8 text-sm md:text-base">
                  We don't assume you already have a following. We help you build your audience and scale your systems simultaneously. By focusing on highly structured smart work, we help you launch, build, and monetize from absolute scratch.
                </p>
                <ul className="space-y-5">
                  {[
                    "Master efficient time-management to run your Instagram in just 2 hours/week.",
                    "Build professional recognition and premium industry authority.",
                    "Turn your small presence into a solid business interest & active monetization stream."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-feature-bg shrink-0 mt-0.5" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* THE COHORT ROADMAP (CURRICULUM) */}
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-border/50 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 border border-feature-bg/10 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Cohort Curriculum
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              The 4-Week <span className="italic text-feature-bg">Smarter Growth</span> Blueprint
            </h2>
            <p className="text-foreground/60 mt-4 text-sm md:text-base leading-relaxed">
              No fluff, no empty hacks. Just a step-by-step execution plan designed specifically for busy professionals to launch, build, and monetize a high-trust Instagram presence from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                week: "Week 01",
                title: "Foundation & The 2-Hour Strategy",
                desc: "Discover your unique positioning and niche from absolute scratch. We map out your exact weekly 2-hour calendar, configure your content assets, and break through the mental barriers of getting started.",
                topics: ["Niche & Positioning Audit", "The 2-Hour Weekly Workflow", "Setting Up Production Assets"]
              },
              {
                week: "Week 02",
                title: "The High-Trust Content Engine",
                desc: "Learn how to script and record high-value reels that command respect. Master visual aesthetics, smart framing, and efficient recording tips that save you hours of unnecessary editing.",
                topics: ["High-Conversion Scripting", "Premium Visual Aesthetics", "Minimalist Recording Secrets"]
              },
              {
                week: "Week 03",
                title: "Smart Work vs. Algorithm Guesswork",
                desc: "Stop chasing random music trends. Learn the real mechanics of social algorithms, how to read your Instagram analytics, and the systems needed to scale both reach and high-trust community engagement.",
                topics: ["Decoding the Real Algorithm", "High-Leverage Distribution", "Metrics that Actually Matter"]
              },
              {
                week: "Week 04",
                title: "Authority Positioning & Monetization",
                desc: "Turn your small, growing presence into active business interest and income. Discover how to create highly-vetted leads, build recognition, and convert casual viewers into premium high-trust clients.",
                topics: ["Monetizing a Small Audience", "Lead-Generation Systems", "Long-Term Authority Branding"]
              }
            ].map((phase, i) => (
              <div key={i} className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl font-extrabold text-feature-bg/20 font-sans tracking-tight group-hover:text-feature-bg/30 transition-colors">{phase.week}</span>
                  <div className="px-3 py-1 bg-muted/60 border border-border rounded-full text-[10px] font-bold text-foreground/50 tracking-wider uppercase">Live Cohort</div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-feature-bg transition-colors">{phase.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">{phase.desc}</p>
                <div className="border-t border-border/50 pt-6">
                  <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest block mb-3">Key Deliverables</span>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, j) => (
                      <span key={j} className="text-xs bg-muted/30 border border-border text-foreground/80 px-3 py-1.5 rounded-full font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FORM SECTION */}
        <section id="apply-form" className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-xl shadow-foreground/5 p-8 sm:p-10 md:p-16">

            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[11px] font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Next Batch Starts: June 2026
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">Join the Waitlist</h2>
              <p className="text-foreground/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Apply for the June 2026 Creator Growth Cohort. Spaces are strictly capped to ensure high-quality, 1-on-1 hands-on mentorship.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-muted/20 border border-border rounded-3xl p-10 md:p-16 text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">Application Received!</h3>
                <p className="text-foreground/60 max-w-xs mx-auto leading-relaxed">
                  We will review your profile and reach out via WhatsApp with the next steps soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                      placeholder="Number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Current Follower Count</label>
                    <select
                      required
                      value={formData.followerCount}
                      onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select range</option>
                      <option value="0-5K">0 – 5K</option>
                      <option value="5K-10K">5K – 10K</option>
                      <option value="10K-20K">10K – 20K</option>
                      <option value="20K+">Over 20K</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Your Profession</label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                    placeholder="e.g. Software Engineer, Consultant, Agency Owner..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Biggest Challenge Right Now</label>
                  <textarea
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20 resize-none"
                    placeholder="What's stopping you from scaling your brand?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 md:h-16 bg-foreground hover:bg-foreground/90 text-white font-bold text-base md:text-lg rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-foreground/10 disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
                >
                  {isLoading ? "Submitting..." : "Submit Application"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
