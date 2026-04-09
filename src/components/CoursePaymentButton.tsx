"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CoursePaymentButtonProps {
  courseId: string;
  priceStr: string; // e.g., "₹1,299"
  className?: string;
}

export default function CoursePaymentButton({ courseId, priceStr, className }: CoursePaymentButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 1. Initial State Load: Check if user exists and already owns this course
  useEffect(() => {
    const fetchAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        // Query the DB
        const { data: purchaseData } = await supabase
          .from("purchases")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("course_id", courseId)
          .single();
          
        if (purchaseData) {
          setHasPurchased(true);
        }
      }
      setIsLoading(false);
    };
    
    fetchAccess();
    
    // Subscribe to auth changes just in case they login on another tab
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchAccess();
      } else {
        setUser(null);
        setHasPurchased(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [courseId]);

  // Load Razorpay Script dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = () => {
    // Redirect to the new low-friction checkout flow
    // We pass the email as a query param if the user is already logged in to pre-fill it
    const emailParam = user?.email ? `?email=${encodeURIComponent(user.email)}` : "";
    router.push(`/checkout/${courseId}${emailParam}`);
  };

  const handleAccess = () => {
    router.push(`/course/${courseId}`);
  };

  if (isLoading) {
    return (
      <button disabled className={`w-full py-4 rounded-xl font-bold flex items-center justify-center opacity-70 ${className}`}>
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Checking Access...
      </button>
    );
  }

  // If already purchased, show green Access Course button
  if (hasPurchased) {
    // We remove color-specific classes from className to ensure our emerald theme wins
    const cleanClassName = className?.replace(/bg-[^\s]+|text-[^\s]+|border-[^\s]+/g, "");
    
    return (
      <button 
        onClick={handleAccess} 
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-emerald-600 text-white font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-500 hover:scale-[1.03] active:scale-95 transition-all relative overflow-hidden group ${cleanClassName}`}
      >
        <motion.div 
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full"
        />
        <PlayCircle className="w-6 h-6 z-10" />
        <span className="z-10 tracking-tight">Access Content Now</span>
      </button>
    );
  }

  // Otherwise, redirect to the new checkout flow
  return (
    <button 
      onClick={handlePayment} 
      className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all hover:scale-[1.02] shadow-sm ${className}`}
    >
      Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
    </button>
  );
}
