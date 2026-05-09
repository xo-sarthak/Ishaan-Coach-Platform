"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Target, TrendingUp, Users, Shield, ArrowDown, ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "🇮🇳 +91", name: "India" },
  { code: "🇦🇫 +93", name: "Afghanistan" },
  { code: "🇦🇱 +355", name: "Albania" },
  { code: "🇩🇿 +213", name: "Algeria" },
  { code: "🇦🇩 +376", name: "Andorra" },
  { code: "🇦🇴 +244", name: "Angola" },
  { code: "🇦🇷 +54", name: "Argentina" },
  { code: "🇦🇲 +374", name: "Armenia" },
  { code: "🇦🇺 +61", name: "Australia" },
  { code: "🇦🇹 +43", name: "Austria" },
  { code: "🇦🇿 +994", name: "Azerbaijan" },
  { code: "🇧🇭 +973", name: "Bahrain" },
  { code: "🇧🇩 +880", name: "Bangladesh" },
  { code: "🇧🇪 +32", name: "Belgium" },
  { code: "🇧🇹 +975", name: "Bhutan" },
  { code: "🇧🇴 +591", name: "Bolivia" },
  { code: "🇧🇦 +387", name: "Bosnia" },
  { code: "🇧🇷 +55", name: "Brazil" },
  { code: "🇧🇳 +673", name: "Brunei" },
  { code: "🇧🇬 +359", name: "Bulgaria" },
  { code: "🇰🇭 +855", name: "Cambodia" },
  { code: "🇨🇦 +1", name: "Canada" },
  { code: "🇨🇱 +56", name: "Chile" },
  { code: "🇨🇳 +86", name: "China" },
  { code: "🇨🇴 +57", name: "Colombia" },
  { code: "🇭🇷 +385", name: "Croatia" },
  { code: "🇨🇾 +357", name: "Cyprus" },
  { code: "🇨🇿 +420", name: "Czechia" },
  { code: "🇩🇰 +45", name: "Denmark" },
  { code: "🇪🇬 +20", name: "Egypt" },
  { code: "🇪🇪 +372", name: "Estonia" },
  { code: "🇪🇹 +251", name: "Ethiopia" },
  { code: "🇫🇯 +679", name: "Fiji" },
  { code: "🇫🇮 +358", name: "Finland" },
  { code: "🇫🇷 +33", name: "France" },
  { code: "🇬🇪 +995", name: "Georgia" },
  { code: "🇩🇪 +49", name: "Germany" },
  { code: "🇬🇷 +30", name: "Greece" },
  { code: "🇭🇰 +852", name: "Hong Kong" },
  { code: "🇭🇺 +36", name: "Hungary" },
  { code: "🇮🇸 +354", name: "Iceland" },
  { code: "🇮🇩 +62", name: "Indonesia" },
  { code: "🇮🇷 +98", name: "Iran" },
  { code: "🇮🇶 +964", name: "Iraq" },
  { code: "🇮🇪 +353", name: "Ireland" },
  { code: "🇮🇱 +972", name: "Israel" },
  { code: "🇮🇹 +39", name: "Italy" },
  { code: "🇯🇵 +81", name: "Japan" },
  { code: "🇯🇴 +962", name: "Jordan" },
  { code: "🇰🇿 +7", name: "Kazakhstan" },
  { code: "🇰🇪 +254", name: "Kenya" },
  { code: "🇰🇼 +965", name: "Kuwait" },
  { code: "🇱🇦 +856", name: "Laos" },
  { code: "🇱🇻 +371", name: "Latvia" },
  { code: "🇱🇧 +961", name: "Lebanon" },
  { code: "🇱🇾 +218", name: "Libya" },
  { code: "🇱🇹 +370", name: "Lithuania" },
  { code: "🇱🇺 +352", name: "Luxembourg" },
  { code: "🇲🇴 +853", name: "Macau" },
  { code: "🇲🇾 +60", name: "Malaysia" },
  { code: "🇲🇻 +960", name: "Maldives" },
  { code: "🇲🇹 +356", name: "Malta" },
  { code: "🇲🇺 +230", name: "Mauritius" },
  { code: "🇲🇽 +52", name: "Mexico" },
  { code: "🇲🇨 +377", name: "Monaco" },
  { code: "🇲🇳 +976", name: "Mongolia" },
  { code: "🇲🇪 +382", name: "Montenegro" },
  { code: "🇲🇦 +212", name: "Morocco" },
  { code: "🇲🇲 +95", name: "Myanmar" },
  { code: "🇳🇵 +977", name: "Nepal" },
  { code: "🇳🇱 +31", name: "Netherlands" },
  { code: "🇳🇿 +64", name: "New Zealand" },
  { code: "🇳🇬 +234", name: "Nigeria" },
  { code: "🇳🇴 +47", name: "Norway" },
  { code: "🇴🇲 +968", name: "Oman" },
  { code: "🇵🇰 +92", name: "Pakistan" },
  { code: "🇵🇸 +970", name: "Palestine" },
  { code: "🇵🇦 +507", name: "Panama" },
  { code: "🇵🇾 +595", name: "Paraguay" },
  { code: "🇵🇪 +51", name: "Peru" },
  { code: "🇵🇭 +63", name: "Philippines" },
  { code: "🇵🇱 +48", name: "Poland" },
  { code: "🇵🇹 +351", name: "Portugal" },
  { code: "🇶🇦 +974", name: "Qatar" },
  { code: "🇷🇴 +40", name: "Romania" },
  { code: "🇷🇺 +7", name: "Russia" },
  { code: "🇸🇦 +966", name: "Saudi Arabia" },
  { code: "🇸🇬 +65", name: "Singapore" },
  { code: "🇸🇰 +421", name: "Slovakia" },
  { code: "🇸🇮 +386", name: "Slovenia" },
  { code: "🇿🇦 +27", name: "South Africa" },
  { code: "🇰🇷 +82", name: "South Korea" },
  { code: "🇪🇸 +34", name: "Spain" },
  { code: "🇱🇰 +94", name: "Sri Lanka" },
  { code: "🇸🇪 +46", name: "Sweden" },
  { code: "🇨🇭 +41", name: "Switzerland" },
  { code: "🇹🇼 +886", name: "Taiwan" },
  { code: "🇹🇭 +66", name: "Thailand" },
  { code: "🇹🇷 +90", name: "Turkey" },
  { code: "🇺🇦 +380", name: "Ukraine" },
  { code: "🇦🇪 +971", name: "UAE" },
  { code: "🇬🇧 +44", name: "UK" },
  { code: "🇺🇸 +1", name: "USA" },
  { code: "🇺🇾 +598", name: "Uruguay" },
  { code: "🇺🇿 +998", name: "Uzbekistan" },
  { code: "🇻🇳 +84", name: "Vietnam" }
];

const getPhoneValidationError = (countryCodeStr: string, localPhone: string): string => {
  const digits = localPhone.replace(/\D/g, "");
  if (!digits) return "Phone number is required.";

  const codeMatch = countryCodeStr.match(/\+(\d+)/);
  const prefix = codeMatch ? codeMatch[1] : "";

  if (prefix === "91") {
    if (digits.length !== 10) {
      return "Indian WhatsApp number must be exactly 10 digits.";
    }
  } else if (prefix === "1") {
    if (digits.length !== 10) {
      return "USA/Canada phone number must be exactly 10 digits.";
    }
  } else if (prefix === "44") {
    if (digits.length !== 10 && digits.length !== 11) {
      return "UK phone number must be 10 or 11 digits.";
    }
  } else if (prefix === "971") {
    if (digits.length !== 9) {
      return "UAE phone number must be exactly 9 digits.";
    }
  } else {
    if (digits.length < 7 || digits.length > 15) {
      return "International phone number must be between 7 and 15 digits.";
    }
  }
  return "";
};

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
  
  const [countryCode, setCountryCode] = useState("🇮🇳 +91");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict validations
    const pErr = getPhoneValidationError(countryCode, formData.phone);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(formData.email);

    if (pErr) {
      setPhoneError(pErr);
      return;
    }
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/creator-growth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${countryCode} ${formData.phone}`
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setPhoneError("");
        setEmailError("");
        setTimeout(() => {
          document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
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
            For creators with <strong className="text-foreground">less than 20,000 followers</strong> who are tired of the content treadmill while managing a full-time job. Learn the exact systems I used to scale a high-trust brand while balancing a career and family.
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
                { label: "PROGRAM FORMAT", val: "2-Day Live Bootcamp" },
                { label: "TIME COMMITMENT", val: "8 Hours Live (4 Hrs/Day)" },
                { label: "ADDITIONAL SUPPORT", val: "Live Q&A & Recordings" },
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
                An IIT Graduate, Startup Founder, and Father Who Conquered the Instagram Game!
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
              Bootcamp Curriculum
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              The 2-Day <span className="italic text-feature-bg">Smarter Growth</span> Bootcamp
            </h2>
            <p className="text-foreground/60 mt-4 text-sm md:text-base leading-relaxed">
              No fluff, no empty hacks. Just a high-leverage 2-day live curriculum designed specifically for busy professionals to launch, build, and monetize a high-trust Instagram presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                week: "Module 01",
                day: "Saturday — Morning",
                title: "Foundation & The 2-Hour Strategy",
                desc: "Discover your unique positioning and niche from absolute scratch. We map out your exact weekly 2-hour calendar, configure your content assets, and break through the mental barriers of getting started.",
                topics: ["Niche & Positioning Audit", "The 2-Hour Weekly Workflow", "Setting Up Production Assets"]
              },
              {
                week: "Module 02",
                day: "Saturday — Afternoon",
                title: "The High-Trust Content Engine",
                desc: "Learn how to script and record high-value reels that command respect. Master visual aesthetics, smart framing, and efficient recording tips that save you hours of unnecessary editing.",
                topics: ["High-Conversion Scripting", "Premium Visual Aesthetics", "Minimalist Recording Secrets"]
              },
              {
                week: "Module 03",
                day: "Sunday — Morning",
                title: "Smart Work vs. Algorithm Guesswork",
                desc: "Stop chasing random music trends. Learn the real mechanics of social algorithms, how to read your Instagram analytics, and the systems needed to scale both reach and high-trust community engagement.",
                topics: ["Decoding the Real Algorithm", "High-Leverage Distribution", "Metrics that Actually Matter"]
              },
              {
                week: "Module 04",
                day: "Sunday — Afternoon",
                title: "Authority Positioning & Monetization",
                desc: "Turn your small, growing presence into active business interest and income. Discover how to create highly-vetted leads, build recognition, and convert casual viewers into premium high-trust clients.",
                topics: ["Monetizing a Small Audience", "Lead-Generation Systems", "Long-Term Authority Branding"]
              }
            ].map((phase, i) => (
              <div key={i} className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                  <span className="text-3xl font-extrabold text-feature-bg/20 font-sans tracking-tight group-hover:text-feature-bg/30 transition-colors">{phase.week}</span>
                  <div className="px-3 py-1 bg-feature-bg/5 border border-feature-bg/10 rounded-full text-[9px] md:text-[10px] font-bold text-feature-bg tracking-wider uppercase whitespace-nowrap shrink-0">{phase.day}</div>
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

        {/* EXCLUSIVE BOOTCAMP RESOURCES */}
        <section className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-border/50 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Included Resources
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              The Bootcamp <span className="italic text-emerald-600">Growth Toolkit</span>
            </h2>
            <p className="text-foreground/60 mt-4 text-sm md:text-base leading-relaxed">
              To support your journey during and after our live weekend together, you will receive access to a curated package of actionable systems, materials, and reference tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Interactive Companion Workbook",
                desc: "A structured, downloadable workbook designed to help you organize content concepts, map out your workflow systems, and systematically implement the bootcamp methodology throughout your growth journey.",
                feature: "Content Systemizer"
              },
              {
                title: "Digitized Whiteboard Notes (PDF)",
                desc: "Access clean, fully-digitized PDF copies of all the notes, frameworks, and visual content models sketched out live during our weekend workshops. Stay focused on learning rather than writing.",
                feature: "Whiteboard PDFs"
              },
              {
                title: "HD Recordings & Extended Q&As",
                desc: "Enjoy lifetime access to the high-definition recordings of both 4-hour modules. Each live session ends with dedicated, open-mic Q&As to ensure none of your personal growth challenges go unanswered.",
                feature: "Lifetime Access"
              }
            ].map((resource, i) => (
              <div key={i} className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1 duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-full">{resource.feature}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-4 group-hover:text-emerald-600 transition-colors">{resource.title}</h3>
                  <p className="text-xs md:text-sm text-foreground/60 leading-relaxed mb-6">{resource.desc}</p>
                </div>
                <div className="border-t border-border/40 pt-4 text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
                  Fully Included
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FORM SECTION */}
        <section id="apply-form" className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-xl shadow-foreground/5 p-5 sm:p-10 md:p-16">

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, email: val });
                        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
                          setEmailError("Please enter a valid email address.");
                        } else {
                          setEmailError("");
                        }
                      }}
                      className={`w-full bg-muted/30 border ${emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-border focus:ring-primary/50"} rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:bg-white transition-all text-foreground placeholder:text-foreground/20`}
                      placeholder="name@email.com"
                    />
                    {emailError && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{emailError}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <div className="flex gap-2 w-full">
                      <div className="relative shrink-0 w-[82px] md:w-[95px]">
                        <select
                          value={countryCode}
                          onChange={(e) => {
                            const code = e.target.value;
                            setCountryCode(code);
                            const err = getPhoneValidationError(code, formData.phone);
                            setPhoneError(err);
                          }}
                          className="bg-muted/30 border border-border rounded-2xl pl-2.5 pr-7 py-3.5 md:py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none w-full h-full cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code} — {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, phone: digitsOnly });
                          const err = getPhoneValidationError(countryCode, digitsOnly);
                          setPhoneError(err);
                        }}
                        className={`flex-1 bg-muted/30 border ${phoneError ? "border-red-500/50 focus:ring-red-500/20" : "border-border focus:ring-primary/50"} rounded-2xl px-4 md:px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:bg-white transition-all text-foreground placeholder:text-foreground/20 min-w-0`}
                        placeholder="Number"
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{phoneError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Current Follower Count</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.followerCount}
                        onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                        className="w-full bg-muted/30 border border-border rounded-2xl pl-5 pr-10 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select range</option>
                        <option value="0-5K">0 – 5K</option>
                        <option value="5K-10K">5K – 10K</option>
                        <option value="10K-20K">10K – 20K</option>
                        <option value="20K+">Over 20K</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                    </div>
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
