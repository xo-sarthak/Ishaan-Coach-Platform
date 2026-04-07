"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Info, Loader2 } from "lucide-react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "already_subscribed" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === "already_subscribed") {
          setStatus("already_subscribed");
          setMessage("Hey! You are already part of the inner circle. See you on Sunday!");
        } else {
          setStatus("success");
          setMessage("Congrats! Welcome to the inner circle. Look out for the next Sunday Insight.");
        }
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter Signup Error:", error);
      setStatus("error");
      setMessage("Failed to connect. Please check your internet and try again.");
    }
  };

  return (
    <section className="w-full bg-foreground py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground/80 text-xs font-black tracking-widest uppercase mb-8 border border-white/10">
          Weekly Ritual
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Sunday <span className="text-primary italic">Insights</span>.
        </h2>
        
        <p className="text-xl text-primary-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Join 50,000+ seekers receiving a weekly framework to build clarity, discipline, and profound awareness.
        </p>

        {status === "idle" || status === "submitting" || status === "error" ? (
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="flex-grow relative group">
              <input 
                type="email" 
                placeholder="Enter your best email" 
                required
                disabled={status === "submitting"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-white/30 font-medium"
              />
            </div>
            <button 
              type="submit"
              disabled={status === "submitting"}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-xl"
            >
              {status === "submitting" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Join the Circle <Send className="w-4 h-4 ml-1" /></>
              )}
            </button>
          </form>
        ) : (
          <div className="max-w-lg mx-auto bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              {status === "success" ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <Info className="w-8 h-8" />
              )}
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              {status === "success" ? "You're Officially In!" : "Already Part of Us!"}
            </h3>
            <p className="text-primary-foreground/80 font-medium leading-relaxed">
              {message}
            </p>
            <button 
              onClick={() => { setStatus("idle"); setEmail(""); }}
              className="mt-6 text-sm font-bold text-primary hover:underline"
            >
              Back to start
            </button>
          </div>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-400 font-bold text-sm animate-in fade-in slide-in-from-top-1 duration-300">
            {message}
          </p>
        ) }

        <p className="mt-10 text-primary-foreground/40 text-xs font-bold uppercase tracking-widest">
          No span. No noise. Just pure value.
        </p>
      </div>
    </section>
  );
};
