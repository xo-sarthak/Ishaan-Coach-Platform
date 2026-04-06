"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, PlayCircle } from "lucide-react";

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

  const handlePayment = async () => {
    // A: Auth check
    if (!user) {
      router.push("/auth");
      return;
    }

    setIsPaying(true);

    try {
      // 1. Load Script
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Failed to load payment gateway. Check your connection.");
        setIsPaying(false);
        return;
      }

      // Convert "₹1,299" to integer "1299"
      const rawPrice = priceStr.replace(/[^0-9]/g, '');

      // 2. Create the backend order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: rawPrice,
          courseId: courseId,
          userId: user.id,
          email: user.email,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 3. Configure Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Coach Platform",
        description: `Enrollment for ${courseId}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // 4. Verify payment with our server
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              email: user.email,
              courseId: courseId,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            setHasPurchased(true); // Update UI
            alert("Payment successful! Welcome to the course.");
            router.push(`/course/${courseId}`); // Go straight to the content
          } else {
            alert("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#B05C46", // Terracotta Primary color
        },
        modal: {
            ondismiss: function() {
                setIsPaying(false); // Reset button if user closes modal
            }
        }
      };

      // 5. Open Razorpay
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        setIsPaying(false);
      });
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong initializing the checkout.");
      setIsPaying(false);
    }
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
    return (
      <button 
        onClick={handleAccess} 
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold shadow-lg hover:shadow-emerald-600/40 hover:bg-emerald-700 transition-all hover:scale-[1.02] ${className}`}
      >
        <PlayCircle className="w-5 h-5" />
        Access Course Now
      </button>
    );
  }

  // Otherwise, show the default checkout button
  return (
    <button 
      onClick={handlePayment} 
      disabled={isPaying}
      className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all hover:scale-[1.02] ${className}`}
    >
      {isPaying ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing Securely...
        </>
      ) : (
        <>
          Secure Checkout <ArrowRight className="w-4 h-4 ml-1" />
        </>
      )}
    </button>
  );
}
