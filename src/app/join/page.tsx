"use client";

import { useState } from "react";
import { MessageCircle, ShieldCheck, Zap, BookOpen, Users, Check, ArrowRight, Download, PartyPopper, Mail } from "lucide-react";

export default function JoinCommunityPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [getGuide, setGetGuide] = useState(true);
  const [getNewsletter, setGetNewsletter] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    interest: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/join-community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, getGuide, getNewsletter })
      });
      const data = await res.json();
      
      if (res.ok) {
        setAlreadySubscribed(data.alreadyInNewsletter);
        setIsSubmitted(true);
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      alert('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center selection:bg-primary/20 p-6 md:p-12">
        <div className="w-full max-w-lg bg-white rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-2xl p-8 md:p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
             <PartyPopper className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
           </div>
           
           <div className="space-y-4">
             <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">Welcome to the Circle!</h1>
             <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
               {alreadySubscribed 
                 ? "Hey! We see you're already subscribed to our newsletter! Here is your WhatsApp link." 
                 : `We've received your application. ${getNewsletter ? "You're also subscribed to our weekly insights." : "You're now part of the 2,400+ members building better lives."}`}
             </p>
           </div>

           <div className="grid gap-4 pt-4">
             {getGuide && (
               <a 
                href="https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 md:p-6 bg-muted/50 border border-border rounded-2xl hover:bg-muted transition-colors group"
               >
                 <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <Download className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                       <p className="font-bold text-foreground text-sm md:text-base">Your Free Guide</p>
                       <p className="text-[10px] md:text-xs text-foreground/50">Hard Earned Lessons.pdf</p>
                    </div>
                 </div>
                 <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:translate-x-1 transition-transform" />
               </a>
             )}

             <a 
               href="https://chat.whatsapp.com/your-link-here" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full h-14 md:h-16 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base md:text-lg rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-200"
             >
               <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white" /> Join WhatsApp Group
             </a>
           </div>

           <button 
            onClick={() => setIsSubmitted(false)}
            className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest hover:text-foreground/60 transition-colors"
           >
             Back to Page
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center selection:bg-primary/20 pb-24">
      
      {/* Header */}
      <header className="w-full max-w-[500px] lg:max-w-6xl mx-auto px-8 md:px-6 py-8 md:py-12 flex items-center justify-center">
        <div className="w-24 hidden lg:block" />
      </header>

      <main className="w-full max-w-[500px] lg:max-w-6xl mx-auto px-8 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* RIGHT (TOP ON MOBILE): The Form */}
        <div className="w-full order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="bg-white rounded-[2.5rem] border border-border shadow-xl shadow-foreground/5 p-8 md:p-12 text-left">
            <div className="mb-8 md:mb-10 text-left">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">Join the Community</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Enter your details to receive instant access to the community and our latest guides.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
               <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="name@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <div className="flex gap-2">
                       <select className="bg-muted/30 border border-border rounded-2xl px-3 py-3.5 md:py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none text-foreground appearance-none min-w-[80px]">
                         <option>🇮🇳 +91</option>
                         <option>🇵🇰 +92</option>
                         <option>🇧🇩 +880</option>
                         <option>🇳🇵 +977</option>
                         <option>🇱🇰 +94</option>
                         <option>🇧🇹 +975</option>
                         <option>🇲🇻 +960</option>
                         <option>🇺🇸 +1</option>
                         <option>🇬🇧 +44</option>
                         <option>🇦🇺 +61</option>
                         <option>🇨🇦 +1</option>
                         <option>🇦🇪 +971</option>
                         <option>🇸🇬 +65</option>
                       </select>
                       <input 
                        type="tel" 
                        placeholder="Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Current Role</label>
                      <select 
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-muted/30 border border-border rounded-2xl px-4 py-3.5 md:py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none appearance-none text-foreground"
                      >
                        <option value="" disabled>Select Role</option>
                        <option>Student</option>
                        <option>Professional</option>
                        <option>Entrepreneur</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Main Interest</label>
                      <select 
                        required
                        value={formData.interest}
                        onChange={(e) => setFormData({...formData, interest: e.target.value})}
                        className="w-full bg-muted/30 border border-border rounded-2xl px-4 py-3.5 md:py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none appearance-none text-foreground"
                      >
                        <option value="" disabled>Select Interest</option>
                        <option>Relationships</option>
                        <option>Career</option>
                        <option>Mindset</option>
                      </select>
                    </div>
                  </div>
               </div>

               <div className="pt-2 space-y-2">
                 {/* Lead Magnet */}
                 <label className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/10 cursor-pointer group transition-all hover:bg-muted/20">
                   <div className="relative flex items-center justify-center">
                     <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={getGuide} 
                        onChange={() => setGetGuide(!getGuide)}
                      />
                     <div className="relative flex items-center justify-center w-5 h-5">
                        <Check className={`w-5 h-5 transition-all ${getGuide ? 'text-foreground opacity-100' : 'text-foreground/20'}`} strokeWidth={4} />
                     </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-foreground/80 leading-none">Get "Hard Earned Lessons" PDF</span>
                      <span className="text-[9px] text-foreground/40 uppercase tracking-wider font-bold mt-1">Free Resource</span>
                   </div>
                 </label>

                 {/* Newsletter */}
                 <label className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/10 cursor-pointer group transition-all hover:bg-muted/20">
                   <div className="relative flex items-center justify-center">
                     <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={getNewsletter} 
                        onChange={() => setGetNewsletter(!getNewsletter)}
                      />
                     <div className="relative flex items-center justify-center w-5 h-5">
                        <Check className={`w-5 h-5 transition-all ${getNewsletter ? 'text-foreground opacity-100' : 'text-foreground/20'}`} strokeWidth={4} />
                     </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-foreground/80 leading-none">Weekly Insights Newsletter</span>
                      <span className="text-[9px] text-foreground/40 uppercase tracking-wider font-bold mt-1">Updates & Wisdom</span>
                   </div>
                 </label>
               </div>

               <button 
                 type="submit"
                 disabled={isLoading}
                 className="w-full h-14 md:h-16 bg-[#2A3B5C] hover:bg-[#1E2A41] text-white font-bold text-base md:text-lg rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-foreground/10 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isLoading ? "Joining..." : "Join Inner Circle"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
               
               <div className="flex items-center justify-center gap-2 pt-2 md:pt-4 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Secured & Private</span>
               </div>
            </form>
          </div>
        </div>

        {/* LEFT (BOTTOM ON MOBILE): Content Section */}
        <div className="flex flex-col space-y-8 text-left order-2 lg:order-1 pb-12 lg:pb-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 text-feature-bg text-sm font-bold tracking-wide w-fit">
            <MessageCircle className="w-4 h-4 fill-feature-bg/20" /> WhatsApp Inner Circle
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] font-bold tracking-tight">
            The Inner <br /> <span className="italic">Circle</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg">
            A private community for those committed to building resilience, clarity, and deeper connections.
          </p>

          <div className="grid gap-4 md:gap-6 pt-4">
             {[
               { icon: <Zap className="w-5 h-5 text-[#F9A826]" />, title: "Weekly Insights", desc: "Actionable strategies on life and mindset. No fluff, just results." },
               { icon: <Users className="w-5 h-5 text-blue-500" />, title: "Networking Hub", desc: "Connect with 2,400+ like-minded individuals on the same journey." },
               { icon: <MessageCircle className="w-5 h-5 text-emerald-500" />, title: "Community Q&A", desc: "Get your pressing questions answered by the community and myself." }
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-4 p-4 md:p-5 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      <footer className="mt-12 md:mt-24 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 px-8 text-center">
        Ishaan Singh &copy; {new Date().getFullYear()} • Privacy First
      </footer>

    </div>
  );
}
