"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Resources",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "Resources", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-card border border-border p-12 rounded-[2.5rem] text-center space-y-6 animate-in fade-in zoom-in duration-500 shadow-sm">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Message Received!</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Thanks for reaching out. I've received your inquiry and will get back to you shortly via email.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="text-primary font-bold hover:underline underline-offset-4 pt-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[100px]" />
      
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif">Your Details</h2>
          <div className="h-1 w-16 bg-primary/30 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Name Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
              <User size={14} className="text-primary" /> Name
            </label>
            <input
              required
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-border py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-lg"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
              <Mail size={14} className="text-primary" /> Email
            </label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-border py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Phone Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
              <Phone size={14} className="text-primary" /> Phone Number
            </label>
            <div className="flex items-center gap-3 border-b border-border py-2 focus-within:border-primary transition-colors">
              <div className="flex items-center gap-2 px-1 border-r border-border">
                <span className="text-lg">🇮🇳</span>
                <span className="text-muted-foreground font-medium">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-lg"
              />
            </div>
          </div>

        </div>

        {/* Service Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">What are you looking for?</label>
          <div className="relative">
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full appearance-none bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-lg cursor-pointer"
            >
              <option value="Courses & Masterclass">Courses & Masterclass</option>
              <option value="Cohort">Cohort</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none w-5 h-5" />
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground">Message (Optional)</label>
          <textarea
            rows={2}
            placeholder="Tell me more about how I can help..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-transparent border-b border-border py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-lg resize-none"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm italic border border-red-100">
            <AlertCircle size={16} />
            Oops! Something went wrong. Please check your connection or try again.
          </div>
        )}

        <button
          disabled={status === "loading"}
          type="submit"
          className="w-full py-5 bg-[#FACC15] hover:bg-[#EAB308] disabled:bg-zinc-200 disabled:text-zinc-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/20"
        >
          {status === "loading" ? (
            <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              Submit <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
