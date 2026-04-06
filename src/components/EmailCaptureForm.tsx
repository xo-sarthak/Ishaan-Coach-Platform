"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";

interface EmailCaptureFormProps {
  resourceId: string;
  resourceSlug: string;
}

export function EmailCaptureForm({ resourceId, resourceSlug }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/resource-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resourceSlug }),
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadUrl(data.downloadUrl);
        setIsSuccess(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Success! Check your inbox.</h3>
        <p className="text-muted-foreground font-medium mb-6">
          We've sent the secure access link to <span className="text-foreground font-bold">{email}</span>. You can also download it directly below:
        </p>
        <a 
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:scale-105 transition-transform"
        >
          <ArrowRight className="w-4 h-4 rotate-90" /> Download Now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mx-auto relative z-10">
      <div className="relative line-clamp-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your best email..."
          className="w-full bg-background border border-border rounded-xl px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-bold text-lg rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-xl shadow-primary/20"
      >
        {isSubmitting ? "Sending Resource..." : "Get Instant Access"} 
        {!isSubmitting && <ArrowRight className="w-5 h-5" />}
      </button>
      <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1.5 opacity-60">
        <Lock className="w-3 h-3" /> 100% Secure. We never spam.
      </p>
    </form>
  );
}
