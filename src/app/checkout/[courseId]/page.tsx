"use client";

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { COURSES } from "@/data/courses";
import { COHORTS } from "@/data/cohorts";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage({ params: paramsPromise }: { params: Promise<{ courseId: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const courseId = params.courseId;
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOwned, setIsOwned] = useState(false);

  // Check if user already owns the course
  useEffect(() => {
    const checkOwnership = async () => {
      if (email && email.includes('@') && email.includes('.')) {
        try {
          const res = await fetch("/api/check-purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, courseId }),
          });
          const data = await res.json();
          setIsOwned(!!data.owned);
        } catch (err) {
          console.error("Error checking ownership:", err);
        }
      }
    };

    const timeoutId = setTimeout(checkOwnership, 500);
    return () => clearTimeout(timeoutId);
  }, [email, courseId]);

  const item = COURSES.find(c => c.id === courseId || c.slug === courseId) 
             || COHORTS.find(c => c.id === courseId || c.slug === courseId);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href="/courses" className="text-primary hover:underline mt-4">Back to courses</Link>
      </div>
    );
  }

  // Handle different data structures for Courses vs Cohorts
  const priceDisplay = 'pricing' in item ? item.pricing[0].price : item.price;
  const rawPrice = priceDisplay.replace(/[^0-9]/g, '');
  const amount = parseInt(rawPrice);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Create order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, courseId: item.id }),
      });

      const { order } = await res.json();

      if (!order) throw new Error("Failed to create order");

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ishaan Singh",
        description: `Purchase: ${item.title}`,
        order_id: order.id,
        prefill: { email },
        handler: async function (response: any) {
          setIsLoading(true);
          // 3. Verify payment on backend
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email,
              courseId: item.id,
            }),
          });

          if (verifyRes.ok) {
            router.push(`/payment-success?email=${encodeURIComponent(email)}&course=${encodeURIComponent(item.title)}`);
          } else {
            router.push(`/payment-failed?id=${item.id}`);
          }
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">You are purchasing</p>
              <h1 className="text-xl font-bold font-serif">{item.title}</h1>
            </div>
            <div className="text-right">
              <p className="text-primary font-black text-2xl">{priceDisplay}</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-black mb-4">Complete your purchase</h2>
            <p className="text-slate-500 mb-8 font-medium">
              Enter the email where you'd like to receive your course access. No login required.
            </p>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your best email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-lg"
                  />
                </div>
              </div>

              {isOwned && (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-emerald-900 leading-none mb-1">Already Owned!</p>
                      <p className="text-emerald-700 text-sm font-medium">You've already purchased this course.</p>
                    </div>
                  </div>
                  <Link 
                    href="/my-purchases" 
                    className="w-full h-12 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200"
                  >
                    Go to My Purchases <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {error && (
                <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 italic">
                  {error}
                </p>
              )}

              {!isOwned && (
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/20"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Continue to Payment <ArrowRight className="w-5 h-5" /></>}
                </button>
              )}
            </form>

            <div className="mt-12 flex items-center justify-center gap-8 border-t border-slate-100 pt-8 text-slate-400">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payment
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Instant Access
              </div>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center mt-8 text-slate-400 text-sm font-medium">
          By continuing, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
