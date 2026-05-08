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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 border border-feature-bg/10 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-feature-bg animate-pulse" />
            For Working Professionals
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Scale your <span className="italic text-feature-bg">Influence</span><br className="hidden md:block" /> without losing your life.
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-10">
            For creators in the <strong className="text-foreground">5K - 50K</strong> follower range who are tired of the content treadmill. Learn the exact systems I used to scale a high-trust brand while balancing a career and family.
          </p>

          <button
            onClick={scrollToForm}
            className="group h-14 md:h-16 px-8 bg-foreground hover:bg-foreground/90 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Apply for the Waitlist <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
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

              <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-foreground/5 border border-border hidden sm:block">
                <div className="text-4xl font-sans font-extrabold tracking-tight text-foreground">20M+</div>
                <div className="text-[10px] font-bold text-feature-bg uppercase tracking-[0.2em] mt-2">Monthly Views</div>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 border border-feature-bg/10 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                Who is Ishaan Singh?
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                I know exactly what it's like to juggle <span className="italic text-feature-bg">everything.</span>
              </h2>

              <div className="space-y-6 text-foreground/70 leading-relaxed text-sm md:text-base">
                <p>
                  Most "Instagram Gurus" have all day to record videos. I don't. And neither do you.
                </p>
                <p>
                  I built my 130K+ following while balancing the exact same responsibilities you have. I didn't rely on luck or trending dances—I built high-leverage systems to scale my brand alongside my life.
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
                  You have an audience.<br /> <span className="text-foreground/40">But you lack a system.</span>
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  { title: "The Content Treadmill", desc: "You're burning out trying to post daily while balancing your actual profession and family." },
                  { title: "Empty Metrics", desc: "You have views and likes, but they aren't translating into a deeply engaged community or solid revenue." },
                  { title: "No Clear Positioning", desc: "You're chasing trends instead of building a high-trust, advice-driven authority brand." }
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
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">The Inner Circle Approach</h3>
                <p className="text-foreground/70 leading-relaxed mb-8 text-sm md:text-base">
                  I built my 130K+ audience not by becoming a full-time influencer, but by treating my content like a high-leverage asset.
                  I focus heavily on relationships, emotional intelligence, and human behavior.
                </p>
                <ul className="space-y-5">
                  {[
                    "Build authority, not just fleeting attention.",
                    "Create sustainable workflows for busy professionals.",
                    "Cultivate a deeply engaged, loyal community."
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

        {/* FORM SECTION */}
        <section id="apply-form" className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-xl shadow-foreground/5 p-8 sm:p-10 md:p-16">

            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">Join the Waitlist</h2>
              <p className="text-foreground/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Apply for the upcoming Creator Growth Cohort. Spaces will be strictly limited to ensure high-quality, hands-on mentorship.
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
                      <option value="5K-20K">5K – 20K (Primary Target)</option>
                      <option value="20K-100K">20K – 100K</option>
                      <option value="100K+">100K+</option>
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
