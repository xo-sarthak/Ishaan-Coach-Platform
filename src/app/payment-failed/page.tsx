"use client";

import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Link from "next/link";
import { COURSES } from "@/data/courses";
import { COHORTS } from "@/data/cohorts";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Determine redirect URL based on item type
  const isCourse = COURSES.some(c => c.id === id || c.slug === id);
  const isCohort = COHORTS.some(c => c.id === id || c.slug === id);
  
  const retryUrl = isCourse ? `/checkout/${id}` : isCohort ? `/checkout/${id}` : "/courses";

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
          href={retryUrl}
          className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3 text-base font-medium text-foreground transition-all hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" /> Try Again
        </Link>
      </motion.div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
