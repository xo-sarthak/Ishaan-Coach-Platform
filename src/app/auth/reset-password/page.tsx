"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Check if session exists (Supabase automatically logs in user via the recovery link)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErrorMsg("Your session has expired. Please request a new reset link.");
      }
    };
    checkSession();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Password updated successfully! Redirecting...");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
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
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
            New Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Please enter a strong, secure password to protect your account.
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

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold leading-none text-foreground/80">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="flex h-11 w-full rounded-xl border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !!successMsg}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-70 mt-6 shadow-lg shadow-primary/20"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Password
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
