"use client";

import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, BookOpen, ShieldCheck, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const pathname = usePathname();

  const triggerPopup = useCallback(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");
    if (!hasSeenPopup && !isOpen) {
      setIsOpen(true);
      setHasTriggered(true);
      sessionStorage.setItem("hasSeenExitPopup", "true");
    }
  }, [isOpen]);

  useEffect(() => {
    // 1. Desktop Mouse Exit Intent
    const mouseOutHandler = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY < 50) {
        triggerPopup();
      }
    };

    // 2. Mobile Fast Scroll Intent
    let lastScrollY = window.scrollY;
    const scrollHandler = () => {
      const currentScrollY = window.scrollY;
      
      // Fast scroll up (Mobile)
      if (lastScrollY - currentScrollY > 60) {
        triggerPopup();
      }

      // 3. Scroll Depth Trigger (75% of page)
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.75 && pathname.includes("/courses/")) {
        triggerPopup();
      }
      
      lastScrollY = currentScrollY;
    };

    // 4. Inactivity Timer (45 seconds)
    let inactivityTimer = setTimeout(() => {
      // Only auto-trigger on course pages for higher engagement
      if (pathname.includes("/courses/")) {
        triggerPopup();
      }
    }, 45000);

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (pathname.includes("/courses/")) {
          triggerPopup();
        }
      }, 45000);
    };

    // 5. Tab Switch / Visibility Change
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        // Trigger if they come back to the tab after 5 seconds of being away
        triggerPopup();
      }
    };

    // 6. Back Button "Safety Net" (Using History API)
    // We push a dummy state so the first "Back" click triggers our logic instead of leaving
    window.history.pushState({ popupArmed: true }, "");
    const popStateHandler = () => {
      if (pathname.includes("/courses/")) {
         triggerPopup();
      }
    };

    // Add all listeners
    document.addEventListener("mouseout", mouseOutHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("popstate", popStateHandler);

    return () => {
      document.removeEventListener("mouseout", mouseOutHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("popstate", popStateHandler);
      clearTimeout(inactivityTimer);
    };
  }, [triggerPopup, pathname]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-[2rem] shadow-2xl border border-border flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Visual/Value Prop (Hidden on small mobile, visible on sm+) */}
        <div className="hidden md:flex flex-col w-2/5 bg-muted p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-primary via-background to-background" />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide w-fit mb-6 border border-primary/20">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Community
            </div>
            
            <h3 className="text-3xl font-playfair font-bold text-foreground mb-4 leading-tight">
              Wait! Before you go...
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Join <strong className="text-foreground">The Inner Circle</strong>. Skip the noise and get exclusive life & relationship strategies sent straight to your phone.
            </p>

            <div className="flex-1" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Curated Resources</h4>
                  <p className="text-xs text-muted-foreground">Handpicked guides and frameworks.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Instant Updates</h4>
                  <p className="text-xs text-muted-foreground">Stay current with what actually matters.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50 flex items-center gap-3">
              <img src="/images/coach4.png" alt="Ishaan Singh" className="w-10 h-10 rounded-full border border-border object-cover" />
              <div>
                <p className="text-sm font-bold text-foreground">Ishaan Singh</p>
                <p className="text-xs text-muted-foreground">Founder, Ishaan Live</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-6 sm:p-10">
           <div className="md:hidden mb-8 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide w-fit mb-4 border border-primary/20">
                <MessageCircle className="w-3.5 h-3.5" /> Free Community
             </div>
             <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
               The Inner Circle
             </h3>
             <p className="text-sm text-muted-foreground">
               Your unfair advantage in life & relationships.
             </p>
           </div>

           <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your name" 
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <div className="flex gap-2">
                   <select className="bg-background border border-border rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-24">
                     <option>🇮🇳 +91</option>
                     <option>🇺🇸 +1</option>
                     <option>🇬🇧 +44</option>
                   </select>
                   <input 
                    type="tel" 
                    placeholder="Phone number (WhatsApp)" 
                    required
                    className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="w-5 h-5 border-2 border-border rounded-md bg-background peer-checked:bg-primary peer-checked:border-primary transition-all" />
                    <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Send me the <strong className="text-foreground">"How to Get Over a Breakup"</strong> PDF for free.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="w-5 h-5 border-2 border-border rounded-md bg-background peer-checked:bg-primary peer-checked:border-primary transition-all" />
                    <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Also subscribe me to the newsletter for weekly insights.
                  </span>
                </label>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-primary/20"
                >
                   Get Instant Access &rarr;
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4">
                 Your data is safe. No spam, ever.
              </p>
           </form>
        </div>

      </div>
    </div>
  );
}
