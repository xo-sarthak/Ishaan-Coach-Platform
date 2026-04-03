"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import ChatInterface from "@/components/ChatInterface";
import { MessageCircle, Zap } from "lucide-react";
import { useState } from "react";

export default function TalkWithMePage() {
  const [coachType, setCoachType] = useState<"relationship" | "life">("relationship");
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-24">
      {/* Top Banner - WhatsApp CTA */}
      <div className="w-full bg-primary text-primary-foreground py-24 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-2xl">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let's Talk 1-on-1
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium">
            Ready to get clarity on your life, career, or relationships? Reach out directly. I check and respond to all messages personally.
          </p>
          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-primary px-10 py-5 text-lg font-bold shadow-xl transition-all hover:bg-white/90 hover:scale-105 hover:shadow-2xl"
          >
            Message me on WhatsApp <ArrowRightIcon className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm text-white/70 font-medium">
            Average response time: 24-48 hours.
          </p>
        </div>
      </div>

      {/* AI Chatbot Section */}
      <div className="max-w-5xl mx-auto px-6 mt-16 md:mt-24">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-border/40">
            <div className="flex items-start md:items-center gap-6">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center shrink-0">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Need a quick reply?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  If you are in a hurry, talk to my AI coach below. It has been perfectly trained on all my frameworks.
                </p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <div className="inline-flex h-11 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground w-full lg:w-auto shrink-0 border border-border/50">
              <button 
                onClick={() => setCoachType("relationship")}
                className={`inline-flex h-full items-center justify-center whitespace-nowrap rounded-lg px-6 text-sm font-semibold transition-all w-1/2 lg:w-auto ${
                  coachType === "relationship" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground hover:bg-muted/80"
                }`}
              >
                Relationship Coach
              </button>
              <button 
                onClick={() => setCoachType("life")}
                className={`inline-flex h-full items-center justify-center whitespace-nowrap rounded-lg px-6 text-sm font-semibold transition-all w-1/2 lg:w-auto ${
                  coachType === "life" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground hover:bg-muted/80"
                }`}
              >
                Life Coach
              </button>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-2xl md:p-6 border border-border/40">
            <ChatInterface 
              type={coachType} 
              title={coachType === "relationship" ? "Relationship Chat" : "Life Coach Chat"} 
              description={coachType === "relationship" ? "Ask me about dating, communication, or dealing with an ex." : "Ask me about your career, building discipline, or finding clarity."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
