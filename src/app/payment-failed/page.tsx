"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentFailedPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-md w-full">
        <div className="mb-6 flex justify-center text-red-500">
          <XCircle className="w-20 h-20" />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight mb-4">Payment Failed ❌</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Something went wrong. Please try again.
        </p>
        <Link
          href="/cohorts"
          className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3 text-base font-medium text-foreground transition-all hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" /> Try Again
        </Link>
      </motion.div>
    </div>
  );
}
