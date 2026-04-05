"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import ChatInterface from "@/components/ChatInterface";
import { MessageCircle, Zap } from "lucide-react";
import { useState } from "react";

export default function TalkWithMePage() {
  const [coachType, setCoachType] = useState<"relationship" | "life">("relationship");
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-24 font-sans selection:bg-emerald-500/20">
      {/* 1. TOP HEADER - PREMIUM DEEP GREEN */}
      <div className="w-full bg-[#0d241b] text-white pt-24 pb-20 px-6 relative overflow-hidden">
        
        {/* Subtle lighting / texture for the dark green */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm backdrop-blur-sm">
            <MessageCircle className="w-8 h-8 text-emerald-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight">
            Let's Chat 1-on-1
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/80 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Ready to get clarity on your life, career, or relationships? Reach out directly. I respond to all messages personally.
          </p>

          <div className="flex flex-col items-center gap-4">
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-emerald-900 border border-transparent px-10 py-4 text-lg font-bold transition-all hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] shadow-xl tracking-wide"
              >
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                Message me on WhatsApp
              </a>
              <p className="text-xs text-emerald-200/50 font-bold uppercase tracking-[0.2em] mt-3">
                Personal Response: 24-48 Hours
              </p>
          </div>
        </div>
      </div>

      {/* AI CHATBOT SECTION (MINIMALIST & REFINED) */}
      <div className="max-w-5xl mx-auto px-6 mt-16 md:mt-24">
        <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-14 shadow-sm overflow-hidden relative">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 dark:bg-emerald-900/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 pb-10 border-b border-border/40 relative z-10">
            <div className="flex items-start md:items-center gap-8">
              <div className="w-14 h-14 bg-muted/60 rounded-2xl flex items-center justify-center shrink-0 border border-border/40 shadow-inner">
                <Zap className="w-7 h-7 text-emerald-600/80" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground/90">Need a quick reply?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                   Talk to my custom AI coach trained on all my unique frameworks.
                </p>
              </div>
            </div>
            
            {/* Toggle Switch - Refined */}
            <div className="inline-flex h-14 items-center justify-center rounded-2xl bg-muted/40 p-1.5 text-muted-foreground w-full lg:w-auto shrink-0 border border-border/30 shadow-inner">
              <button 
                onClick={() => setCoachType("relationship")}
                className={`inline-flex h-full items-center justify-center whitespace-nowrap rounded-xl px-8 text-[11px] font-black uppercase tracking-[0.1em] transition-all w-1/2 lg:w-auto ${
                  coachType === "relationship" ? "bg-emerald-600 text-white shadow-md border-transparent" : "hover:text-emerald-900 dark:hover:text-white hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30"
                }`}
              >
                Relationships
              </button>
              <button 
                onClick={() => setCoachType("life")}
                className={`inline-flex h-full items-center justify-center whitespace-nowrap rounded-xl px-8 text-[11px] font-black uppercase tracking-[0.1em] transition-all w-1/2 lg:w-auto ${
                  coachType === "life" ? "bg-emerald-600 text-white shadow-md border-transparent" : "hover:text-emerald-900 dark:hover:text-white hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30"
                }`}
              >
                Life & Performance
              </button>
            </div>
          </div>
          
          <div className="bg-background/40 dark:bg-muted/10 rounded-3xl md:p-6 border border-border/30 backdrop-blur-sm relative z-10">
            <ChatInterface 
              type={coachType} 
              title={coachType === "relationship" ? "Relationship Strategy" : "Life Strategy Bot"} 
              description={coachType === "relationship" ? "Immediate answers on dating, social dynamics, and communication." : "Clarify your goals, build discipline, and optimize your weekly performance."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 448 512" 
      fill="currentColor" 
      {...props}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 69.4 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.6-9.2 1.9-3.7 1-7-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.5 3.6 35.1 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}
