"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, Lock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingData, setOnboardingData] = useState<{ email: string; userExists: boolean } | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Missing onboarding token.");
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (res.ok) {
          setOnboardingData(data);
        } else {
          setError(data.error || "Invalid or expired link.");
        }
      } catch (err) {
        setError("Connection error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          password, 
          isExistingUser: onboardingData?.userExists 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/my-purchases");
        }, 1500);
      } else {
        setError(data.error || "Failed to complete onboarding.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Verifying Access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black mb-4 tracking-tight">Access Restricted</h1>
        <p className="text-slate-500 max-w-sm mb-8 font-medium">{error}</p>
        <button 
          onClick={() => router.push("/auth")}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold transition-all hover:scale-105"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-emerald-100">
                <ShieldCheck className="w-4 h-4" /> Payment Verified
              </div>

              <h1 className="text-4xl font-black mb-4 tracking-tight">
                {onboardingData?.userExists ? "Welcome Back! 👋" : "Claim Your Access 🚀"}
              </h1>
              <p className="text-slate-500 mb-10 font-medium">
                We've linked your purchase to <span className="text-foreground font-bold">{onboardingData?.email}</span>. 
                {onboardingData?.userExists 
                  ? " Please enter your password to unlock your course." 
                  : " Please set a password to create your account and start learning."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">
                    {onboardingData?.userExists ? "Your Password" : "Set Password"}
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password" 
                      required 
                      autoFocus
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 italic">
                    {error}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>{onboardingData?.userExists ? "Login & Unlock" : "Set Password & Start"} <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <CheckCircle2 className="w-12 h-12 z-10" />
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-emerald-400 rounded-full"
              />
            </div>
            <h2 className="text-4xl font-black mb-4">You're All Set!</h2>
            <div className="flex items-center justify-center gap-2 text-primary font-bold">
              <Sparkles className="w-5 h-5" /> Unlocking your purchase...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Onboarding...</p>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
