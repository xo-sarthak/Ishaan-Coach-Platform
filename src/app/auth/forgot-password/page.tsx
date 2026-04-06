"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/reset-password",
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Check your email for the password reset link!");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
            Reset Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the email associated with your account and we'll send a link to reset your password.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium text-center border border-emerald-200">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold leading-none text-foreground/80">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              required
              className="flex h-11 w-full rounded-xl border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !!successMsg}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-70 mt-6"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 text-center pt-4">
          <Link href="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
