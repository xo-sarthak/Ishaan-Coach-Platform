"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-md w-full">
        <div className="mb-6 flex justify-center text-green-500">
          <CheckCircle2 className="w-20 h-20" />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight mb-4">Payment Successful 🎉</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Your payment has been received. Continue to complete your registration.
        </p>
        <Link
          href="/cohort-form"
          className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Continue to Form <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
