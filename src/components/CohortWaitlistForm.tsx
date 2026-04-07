"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Sparkles } from "lucide-react";

interface CohortWaitlistFormProps {
  cohortId: string;
  cohortTitle: string;
}

export function CohortWaitlistForm({ cohortId, cohortTitle }: CohortWaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/cohort-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, cohortId, cohortTitle }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.alreadyRegistered) {
          setIsAlreadyRegistered(true);
        }
        setIsSuccess(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full text-center animate-in zoom-in-95 duration-500 py-4">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black mb-4 tracking-tight">
          {isAlreadyRegistered ? "Already Registered!" : "You're on the list!"}
        </h3>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          {isAlreadyRegistered ? (
            <>
              We've already got your details for <br />
              <span className="text-primary font-bold italic">{cohortTitle}</span>. <br />
              <span className="text-foreground font-bold block mt-3">We're looking forward to having you!</span>
            </>
          ) : (
            <>
              We'll notify you at <br />
              <span className="text-foreground font-bold block my-2">{email}</span> 
              as soon as enrollment opens for <br />
              <span className="text-primary font-bold italic">{cohortTitle}</span>.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6 text-primary font-bold text-sm uppercase tracking-wider">
        <Sparkles className="w-4 h-4" /> Get early access
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full bg-background border-2 border-border rounded-xl px-6 py-4 text-base focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground font-bold text-lg rounded-xl px-8 py-5 flex items-center justify-center gap-3 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-xl shadow-primary/20"
        >
          {isSubmitting ? "Joining List..." : "Join the Waitlist"} 
          {!isSubmitting && <ArrowRight className="w-5 h-5" />}
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5 opacity-60 uppercase font-bold tracking-widest">
          <Lock className="w-2.5 h-2.5" /> No Spam. Only VIP Updates.
        </p>
      </form>
    </div>
  );
}
