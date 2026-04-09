"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, ArrowRight, HelpCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const course = searchParams.get("course");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full text-center">
        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
        >
          Payment Successful! 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-500 mb-12 font-medium leading-relaxed"
        >
          You've just invested in yourself. We're getting your access to <span className="text-foreground font-black">"{course || "the course"}"</span> ready.
        </motion.p>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-black mb-4">Check your Email</h3>
            <p className="text-slate-600 mb-8 font-medium">
              We've sent a magic link to <span className="text-primary font-bold">{email || "your email"}</span>.
              Click the link inside to set your password and access your course.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/my-purchases"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-6 pt-6 border-t border-slate-100"
        >
          <div className="flex items-start gap-4 text-left p-6 bg-slate-50 rounded-2xl border border-slate-200/50">
            <HelpCircle className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold">Entered the wrong email?</h4>
              <p className="text-slate-500 text-sm font-medium mb-3">
                Don't worry, we'll fix it. Take a screenshot of your payment ID and reach out.
              </p>
              <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group shadow-sm">
                <span className="text-primary font-black text-base select-all tracking-tight">hello@ishaanlive.in</span>
                <Mail className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Completing Purchase...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
