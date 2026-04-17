"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, Lock, ArrowRight, CheckCircle2, Sparkles, UserPlus, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingData, setOnboardingData] = useState<{ email: string; userExists: boolean } | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAutoLinking, setIsAutoLinking] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Missing onboarding token.");
      setIsLoading(false);
      return;
    }

    const verifyAndAutoLink = async () => {
      try {
        // 1. Verify token
        const res = await fetch("/api/auth/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || "Invalid or expired link.");
          setIsLoading(false);
          return;
        }

        setOnboardingData(data);

        // 2. Check for active session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && session.user.email?.toLowerCase() === data.email.toLowerCase()) {
          // AUTO-LINK FLOW
          setIsAutoLinking(true);
          setIsLoading(false);
          
          // Wait a moment for "flow" state
          await new Promise(r => setTimeout(r, 1500));
          
          const completeRes = await fetch("/api/auth/onboarding/complete", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`
            },
            body: JSON.stringify({ token, isExistingUser: true }),
          });

          if (completeRes.ok) {
            setIsSuccess(true);
            setTimeout(() => router.push("/my-purchases"), 1500);
          } else {
            const completeData = await completeRes.json();
            setError(completeData.error || "Failed to link purchase automatically.");
            setIsAutoLinking(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        setError("Connection error. Please try again.");
        setIsLoading(false);
      }
    };

    verifyAndAutoLink();
  }, [token, router]);

  const handleGoogleLogin = async () => {
    try {
      setError("");
      // Construct the current URL as the return URL, but remove the token if needed
      // or just redirect back here with the token.
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.href // Return back here to trigger auto-link
        }
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      setError("Google Login failed: " + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!onboardingData?.userExists) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }
      if (!fullName || !phoneNumber) {
        setError("Please fill in all fields (Name & Phone).");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/auth/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          password, 
          isExistingUser: onboardingData?.userExists,
          fullName: !onboardingData?.userExists ? fullName : undefined,
          phone: !onboardingData?.userExists ? phoneNumber : undefined
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ... success logic ...
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email || onboardingData?.email || "",
          password: password,
        });

        if (signInError) {
          console.error("Client-side login failed:", signInError);
          setError("Purchase linked, but we couldn't log you in automatically. Please try the standard login page.");
          setIsSubmitting(false);
          return;
        }

        setIsSuccess(true);
        setTimeout(() => {
          router.push("/my-purchases");
        }, 1500);
      } else {
        // Handle failure without navigating away
        setError(data.error || "Failed to complete onboarding.");
        setErrorDetails(data.details || "");
        
        // Count attempts for password failures
        if (onboardingData?.userExists && data.error?.toLowerCase().includes("password")) {
          setFailedAttempts(prev => prev + 1);
        }
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isAutoLinking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            {isAutoLinking ? "Linking your purchase... 🚀" : "Verifying Access..."}
          </p>
        </motion.div>
      </div>
    );
  }

  // Only show the hard "Access Restricted" view if we haven't even successfully loaded token data yet
  if (error && !onboardingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black mb-4 tracking-tight">Access Restricted</h1>
        <p className="text-slate-500 max-w-sm mb-4 font-medium">{error}</p>
        
        {errorDetails && (
          <div className="mb-8 p-4 bg-slate-100 rounded-xl text-left border border-slate-200 w-full max-w-md">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Error Details</p>
            <code className="text-xs text-slate-600 break-all">{errorDetails}</code>
          </div>
        )}
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
                We&apos;ve linked your purchase to <span className="text-foreground font-bold">{onboardingData?.email}</span>. 
                {onboardingData?.userExists 
                  ? " Please enter your password to unlock your course." 
                  : " Please set a password below to create your account and start learning."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  {!onboardingData?.userExists && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                        />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">
                        {onboardingData?.userExists ? "Confirm Password" : "Create Password"}
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="password" 
                          required 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                        />
                      </div>
                    </div>

                    {!onboardingData?.userExists && (
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Confirm Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="space-y-4">
                    <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 italic">
                      {error}
                    </p>
                    
                    {failedAttempts >= 3 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-[#2A3B5C] font-bold text-sm mb-4">
                           Having trouble with your password? 
                        </p>
                        <div className="flex flex-col gap-3">
                          <button 
                            type="button" 
                            onClick={() => router.push(`/auth?email=${encodeURIComponent(onboardingData?.email || '')}`)}
                            className="text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2"
                          >
                            <ArrowRight className="w-3 h-3" /> Forgot Password? Use standard login
                          </button>
                          <button 
                            type="button" 
                            onClick={handleGoogleLogin}
                            className="text-xs font-black uppercase tracking-widest text-[#2A3B5C] hover:underline flex items-center gap-2"
                          >
                            <ArrowRight className="w-3 h-3" /> Try Login with Google
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>{onboardingData?.userExists ? "Login & Unlock Course" : "Create Account & Start Learning"} <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-300">
                  <span className="bg-white px-4">OR CONTINUE WITH</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                {onboardingData?.userExists ? "Login with Google" : "Sign up with Google"}
              </button>

              {onboardingData?.userExists && (
                <div className="mt-8 text-center">
                  <button 
                    type="button"
                    onClick={() => router.push(`/auth?email=${encodeURIComponent(onboardingData.email)}`)}
                    className="text-sm font-bold text-slate-400 hover:text-primary transition-colors"
                  >
                    Forgot password? Login via standard page
                  </button>
                </div>
              )}
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
