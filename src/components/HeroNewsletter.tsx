"use client";

import React, { useState } from "react";
import { Star, Loader2, CheckCircle2, Info } from "lucide-react";

export function HeroNewsletter() {
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
    <div className="mt-4 bg-white/70 backdrop-blur-md rounded-3xl p-5 md:p-8 shadow-sm border border-white/60 relative overflow-hidden group">
      <div className="flex flex-col gap-1.5 mb-6">
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#2A3B5C] flex items-center gap-2">
          Subscribe to Newsletter <span className="inline-block origin-bottom-left -rotate-12 transform group-hover:rotate-12 transition-transform duration-500">✍️</span>
        </h3>
        <p className="text-[#2A3B5C]/80 text-sm leading-relaxed max-w-sm">
          Join a growing community. Each week, I share actionable productivity tips, practical life advice, and book highlights directly to your inbox.
        </p>
      </div>

      {status === "idle" || status === "submitting" || status === "error" ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 bg-transparent sm:bg-white/80 p-0 sm:p-1.5 rounded-none sm:rounded-full sm:border sm:border-white sm:shadow-inner max-w-md w-full focus-within:ring-0 sm:focus-within:ring-2 sm:focus-within:ring-[#2A3B5C]/20 transition-all">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-5 py-3.5 sm:py-2.5 border border-white/60 sm:border-none bg-white sm:bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#2A3B5C]/20 sm:focus:ring-0 placeholder:text-[#2A3B5C]/40 font-medium text-[#2A3B5C] shadow-sm sm:shadow-none"
              required
              disabled={status === "submitting"}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#2A3B5C] text-white px-8 py-3.5 sm:py-2.5 rounded-full font-bold text-sm hover:bg-opacity-90 transition-opacity shadow-sm whitespace-nowrap min-w-[120px] flex items-center justify-center"
            >
              {status === "submitting" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-3 text-red-500 text-xs font-bold px-4 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
              <Info className="w-3 h-3" /> {message}
            </p>
          )}
        </>
      ) : (
        <div className="bg-white/90 border border-[#2A3B5C]/10 rounded-2xl p-6 animate-in zoom-in-95 duration-500 shadow-inner">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === "success" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
              {status === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <h4 className="font-bold text-[#2A3B5C] text-lg">
              {status === "success" ? "You're in!" : "Already Subscribed"}
            </h4>
          </div>
          <p className="text-sm text-[#2A3B5C]/80 font-medium leading-relaxed pl-11">
            {message}
          </p>
          <button
            onClick={() => { setStatus("idle"); setEmail(""); }}
            className="mt-4 ml-11 text-xs font-bold text-[#2A3B5C]/40 hover:text-[#2A3B5C] transition-colors flex items-center gap-1"
          >
            ← Try another email
          </button>
        </div>
      )}

      {/* Social Proof */}
      <div className="flex items-center gap-3 text-xs text-[#2A3B5C]/80 font-medium mt-6">
        <div className="flex -space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm ring-1 ring-black/5"><img src="https://i.pravatar.cc/100?img=1" alt="Reader" className="w-full h-full object-cover" /></div>
          <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white overflow-hidden shadow-sm ring-1 ring-black/5"><img src="https://i.pravatar.cc/100?img=5" alt="Reader" className="w-full h-full object-cover" /></div>
          <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white overflow-hidden shadow-sm ring-1 ring-black/5"><img src="https://i.pravatar.cc/100?img=9" alt="Reader" className="w-full h-full object-cover" /></div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-current text-[#F9A826]" />
            <Star className="w-3.5 h-3.5 fill-current text-[#F9A826]" />
            <Star className="w-3.5 h-3.5 fill-current text-[#F9A826]" />
            <Star className="w-3.5 h-3.5 fill-current text-[#F9A826]" />
            <Star className="w-3.5 h-3.5 fill-current text-[#F9A826]" />
          </div>
          <span className="mt-0.5">Join 2,500+ friendly readers</span>
        </div>
      </div>
    </div>
  );
}
