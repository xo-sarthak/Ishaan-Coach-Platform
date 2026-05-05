"use client";

import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, BookOpen, Zap, Check, ArrowRight, Download } from "lucide-react";
import { usePathname } from "next/navigation";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [getGuide, setGetGuide] = useState(true);
  const [getNewsletter, setGetNewsletter] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "🇮🇳 +91"
  });

  const pathname = usePathname();

  const triggerPopup = useCallback(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");
    if (!hasSeenPopup && !isOpen && !isSubmitted) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenExitPopup", "true");
    }
  }, [isOpen, isSubmitted]);

  useEffect(() => {
    const mouseOutHandler = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY < 50) triggerPopup();
    };

    const scrollHandler = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.85) triggerPopup();
    };

    document.addEventListener("mouseout", mouseOutHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      document.removeEventListener("mouseout", mouseOutHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [triggerPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/join-community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          phone: `${formData.countryCode} ${formData.phone}`,
          role: "Not Specified", 
          interest: "Not Specified",
          getGuide, 
          getNewsletter 
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        // 1. Trigger Auto-Download if guide is checked
        if (getGuide) {
          const link = document.createElement('a');
          link.href = "https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh";
          link.download = "Hard Earned Lessons.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // 2. Instant Redirect to WhatsApp
        window.location.href = "https://chat.whatsapp.com/your-link-here";
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      alert('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 selection:bg-primary/20">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl border border-border flex flex-col md:flex-row overflow-hidden">
        
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-muted/50 backdrop-blur-md rounded-full flex items-center justify-center border border-border text-foreground/40 hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center space-y-6">
             <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
               <Check className="w-10 h-10 text-emerald-600" />
             </div>
             <h2 className="text-3xl font-serif font-bold text-foreground">You're in!</h2>
             <p className="text-foreground/60 max-w-sm mx-auto">
               {alreadySubscribed 
                 ? "We noticed you're already in our newsletter! Here is your community link." 
                 : "Welcome to the Inner Circle. Your journey starts now."}
             </p>
             
             <div className="grid gap-3 w-full max-w-xs mx-auto">
               {getGuide && (
                 <a 
                   href="https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full h-14 bg-muted border border-border rounded-xl transition-all flex items-center justify-between px-5 group"
                 >
                   <div className="flex items-center gap-3 text-left">
                     <Download className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                     <div className="flex flex-col">
                       <span className="text-[11px] font-bold text-foreground">Download PDF</span>
                       <span className="text-[9px] text-foreground/30 font-bold uppercase">Hard Earned Lessons</span>
                     </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-foreground/20 group-hover:translate-x-1 transition-transform" />
                 </a>
               )}

               <a 
                 href="https://chat.whatsapp.com/your-link-here" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
               >
                 <MessageCircle className="w-5 h-5 fill-white" /> Join WhatsApp Community
               </a>
             </div>
          </div>
        ) : (
          <>
            {/* Left Side - Desktop Value Prop */}
            <div className="hidden md:flex flex-col w-[35%] bg-muted/30 p-10 relative overflow-hidden border-r border-border">
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 text-[10px] font-bold uppercase tracking-widest w-fit mb-6 border border-border">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Community
                </div>
                <h3 className="text-3xl font-serif font-bold text-foreground mb-4 leading-tight">Wait! Before you go...</h3>
                <p className="text-foreground/50 text-sm leading-relaxed mb-8">Join the Circle for exclusive life and relationship strategies sent to your phone.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#F9A826] mt-1" />
                    <div><h4 className="text-sm font-bold">Weekly Insights</h4><p className="text-xs text-foreground/40">No fluff, just results.</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                    <div><h4 className="text-sm font-bold">Curated Resources</h4><p className="text-xs text-foreground/40">Handpicked guides.</p></div>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-border flex items-center gap-3">
                  <img src="/images/coach4.png" alt="Ishaan" className="w-10 h-10 rounded-full border border-border object-cover" />
                  <div><p className="text-sm font-bold">Ishaan Singh</p><p className="text-[10px] uppercase font-bold text-foreground/30">Founder</p></div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 sm:p-12">
               <div className="md:hidden text-center mb-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 text-[10px] font-bold uppercase tracking-widest w-fit mb-4 border border-border">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Community
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-foreground">The Inner Circle</h3>
               </div>

               <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <input type="text" placeholder="Your name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-muted/30 border border-border rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                    <input type="email" placeholder="Email address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-muted/30 border border-border rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                    
                    {/* Fixed Country Code/Phone Row for S20 Ultra */}
                    <div className="flex gap-2 w-full">
                       <select value={formData.countryCode} onChange={e => setFormData({...formData, countryCode: e.target.value})}
                         className="bg-muted/30 border border-border rounded-xl px-2 py-4 text-xs focus:ring-2 focus:ring-primary/50 outline-none appearance-none min-w-[70px]">
                         <option>🇮🇳 +91</option><option>🇵🇰 +92</option><option>🇧🇩 +880</option><option>🇳🇵 +977</option><option>🇱🇰 +94</option><option>🇺🇸 +1</option><option>🇬🇧 +44</option><option>🇦🇪 +971</option>
                       </select>
                       <input type="tel" placeholder="WhatsApp Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                         className="flex-1 bg-muted/30 border border-border rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none min-w-0" />
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input type="checkbox" className="peer sr-only" checked={getGuide} onChange={() => setGetGuide(!getGuide)} />
                        <Check className={`w-5 h-5 transition-all ${getGuide ? 'text-foreground opacity-100' : 'text-foreground/10'}`} strokeWidth={4} />
                      </div>
                      <span className="text-xs text-foreground/60 group-hover:text-foreground">Get <strong className="text-foreground">"Hard Earned Lessons"</strong> PDF for free.</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input type="checkbox" className="peer sr-only" checked={getNewsletter} onChange={() => setGetNewsletter(!getNewsletter)} />
                        <Check className={`w-5 h-5 transition-all ${getNewsletter ? 'text-foreground opacity-100' : 'text-foreground/10'}`} strokeWidth={4} />
                      </div>
                      <span className="text-xs text-foreground/60 group-hover:text-foreground">Subscribe to weekly insights newsletter.</span>
                    </label>
                  </div>

                  <div className="pt-6">
                    <button type="submit" disabled={isLoading}
                      className="w-full bg-[#2A3B3C] hover:bg-black text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                    >
                       {isLoading ? "Joining..." : "Join WhatsApp Community"} <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-foreground/30 mt-6">Your data is safe • No spam</p>
                  </div>
               </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
