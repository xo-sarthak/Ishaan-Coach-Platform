"use client";

import { useState } from "react";
import { MessageCircle, ShieldCheck, Zap, BookOpen, Users, Check, ArrowRight, Download, PartyPopper, Mail, ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "🇮🇳 +91", name: "India" },
  { code: "🇦🇫 +93", name: "Afghanistan" },
  { code: "🇦🇱 +355", name: "Albania" },
  { code: "🇩🇿 +213", name: "Algeria" },
  { code: "🇦🇩 +376", name: "Andorra" },
  { code: "🇦🇴 +244", name: "Angola" },
  { code: "🇦🇷 +54", name: "Argentina" },
  { code: "🇦🇲 +374", name: "Armenia" },
  { code: "🇦🇺 +61", name: "Australia" },
  { code: "🇦🇹 +43", name: "Austria" },
  { code: "🇦🇿 +994", name: "Azerbaijan" },
  { code: "🇧🇭 +973", name: "Bahrain" },
  { code: "🇧🇩 +880", name: "Bangladesh" },
  { code: "🇧🇪 +32", name: "Belgium" },
  { code: "🇧🇹 +975", name: "Bhutan" },
  { code: "🇧🇴 +591", name: "Bolivia" },
  { code: "🇧🇦 +387", name: "Bosnia" },
  { code: "🇧🇷 +55", name: "Brazil" },
  { code: "🇧🇳 +673", name: "Brunei" },
  { code: "🇧🇬 +359", name: "Bulgaria" },
  { code: "🇰🇭 +855", name: "Cambodia" },
  { code: "🇨🇦 +1", name: "Canada" },
  { code: "🇨🇱 +56", name: "Chile" },
  { code: "🇨🇳 +86", name: "China" },
  { code: "🇨🇴 +57", name: "Colombia" },
  { code: "🇭🇷 +385", name: "Croatia" },
  { code: "🇨🇾 +357", name: "Cyprus" },
  { code: "🇨🇿 +420", name: "Czechia" },
  { code: "🇩🇰 +45", name: "Denmark" },
  { code: "🇪🇬 +20", name: "Egypt" },
  { code: "🇪🇪 +372", name: "Estonia" },
  { code: "🇪🇹 +251", name: "Ethiopia" },
  { code: "🇫🇯 +679", name: "Fiji" },
  { code: "🇫🇮 +358", name: "Finland" },
  { code: "🇫🇷 +33", name: "France" },
  { code: "🇬🇪 +995", name: "Georgia" },
  { code: "🇩🇪 +49", name: "Germany" },
  { code: "🇬🇷 +30", name: "Greece" },
  { code: "🇭🇰 +852", name: "Hong Kong" },
  { code: "🇭🇺 +36", name: "Hungary" },
  { code: "🇮🇸 +354", name: "Iceland" },
  { code: "🇮🇩 +62", name: "Indonesia" },
  { code: "🇮🇷 +98", name: "Iran" },
  { code: "🇮🇶 +964", name: "Iraq" },
  { code: "🇮🇪 +353", name: "Ireland" },
  { code: "🇮🇱 +972", name: "Israel" },
  { code: "🇮🇹 +39", name: "Italy" },
  { code: "🇯🇵 +81", name: "Japan" },
  { code: "🇯🇴 +962", name: "Jordan" },
  { code: "🇰🇿 +7", name: "Kazakhstan" },
  { code: "🇰🇪 +254", name: "Kenya" },
  { code: "🇰🇼 +965", name: "Kuwait" },
  { code: "🇱🇦 +856", name: "Laos" },
  { code: "🇱🇻 +371", name: "Latvia" },
  { code: "🇱🇧 +961", name: "Lebanon" },
  { code: "🇱🇾 +218", name: "Libya" },
  { code: "🇱🇹 +370", name: "Lithuania" },
  { code: "🇱🇺 +352", name: "Luxembourg" },
  { code: "🇲🇴 +853", name: "Macau" },
  { code: "🇲🇾 +60", name: "Malaysia" },
  { code: "🇲🇻 +960", name: "Maldives" },
  { code: "🇲🇹 +356", name: "Malta" },
  { code: "🇲🇺 +230", name: "Mauritius" },
  { code: "🇲🇽 +52", name: "Mexico" },
  { code: "🇲🇨 +377", name: "Monaco" },
  { code: "🇲🇳 +976", name: "Mongolia" },
  { code: "🇲🇪 +382", name: "Montenegro" },
  { code: "🇲🇦 +212", name: "Morocco" },
  { code: "🇲🇲 +95", name: "Myanmar" },
  { code: "🇳🇵 +977", name: "Nepal" },
  { code: "🇳🇱 +31", name: "Netherlands" },
  { code: "🇳🇿 +64", name: "New Zealand" },
  { code: "🇳🇬 +234", name: "Nigeria" },
  { code: "🇳🇴 +47", name: "Norway" },
  { code: "🇴🇲 +968", name: "Oman" },
  { code: "🇵🇰 +92", name: "Pakistan" },
  { code: "🇵🇸 +970", name: "Palestine" },
  { code: "🇵🇦 +507", name: "Panama" },
  { code: "🇵🇾 +595", name: "Paraguay" },
  { code: "🇵🇪 +51", name: "Peru" },
  { code: "🇵🇭 +63", name: "Philippines" },
  { code: "🇵🇱 +48", name: "Poland" },
  { code: "🇵🇹 +351", name: "Portugal" },
  { code: "🇶🇦 +974", name: "Qatar" },
  { code: "🇷🇴 +40", name: "Romania" },
  { code: "🇷🇺 +7", name: "Russia" },
  { code: "🇸🇦 +966", name: "Saudi Arabia" },
  { code: "🇸🇬 +65", name: "Singapore" },
  { code: "🇸🇰 +421", name: "Slovakia" },
  { code: "🇸🇮 +386", name: "Slovenia" },
  { code: "🇿🇦 +27", name: "South Africa" },
  { code: "🇰🇷 +82", name: "South Korea" },
  { code: "🇪🇸 +34", name: "Spain" },
  { code: "🇱🇰 +94", name: "Sri Lanka" },
  { code: "🇸🇪 +46", name: "Sweden" },
  { code: "🇨🇭 +41", name: "Switzerland" },
  { code: "🇹🇼 +886", name: "Taiwan" },
  { code: "🇹🇭 +66", name: "Thailand" },
  { code: "🇹🇷 +90", name: "Turkey" },
  { code: "🇺🇦 +380", name: "Ukraine" },
  { code: "🇦🇪 +971", name: "UAE" },
  { code: "🇬🇧 +44", name: "UK" },
  { code: "🇺🇸 +1", name: "USA" },
  { code: "🇺🇾 +598", name: "Uruguay" },
  { code: "🇺🇿 +998", name: "Uzbekistan" },
  { code: "🇻🇳 +84", name: "Vietnam" }
];

export default function JoinCommunityPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [getGuide, setGetGuide] = useState(true);
  const [getNewsletter, setGetNewsletter] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "🇮🇳 +91",
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
      if (res.ok) {
        if (getGuide) {
          const link = document.createElement('a');
          link.href = "https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh";
          link.download = "Hard Earned Lessons.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        window.location.href = "https://chat.whatsapp.com/your-link-here";
      } else {
        const data = await res.json();
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      alert('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center selection:bg-primary/20 pb-24 pt-4 md:pt-0">
      
      <main className="w-full max-w-[500px] lg:max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 lg:gap-24 items-start md:mt-32">
        
        {/* DESKTOP LEFT / MOBILE BOTTOM: The Content */}
        <div className="w-full flex flex-col space-y-8 text-left order-2 lg:order-1 pb-12 lg:pb-0">
          <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase border border-feature-bg/10 w-fit">
            <MessageCircle className="w-3.5 h-3.5 fill-feature-bg/20" /> WhatsApp Community
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] font-bold tracking-tight">
              The Inner <br className="hidden lg:block" /> <span className="italic">Circle</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg">
              A private community for those committed to building resilience, clarity, and deeper connections.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 pt-4 max-w-lg w-full">
             {[
               { icon: <Zap className="w-5 h-5 text-[#F9A826]" />, title: "Weekly Insights", desc: "Actionable strategies on life and mindset. No fluff, just results." },
               { icon: <Users className="w-5 h-5 text-blue-500" />, title: "Networking Hub", desc: "Connect with like-minded individuals on the same journey." },
               { icon: <MessageCircle className="w-5 h-5 text-emerald-500" />, title: "Community Q&A", desc: "Get your pressing questions answered by the community and myself." }
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-white shadow-sm text-left group hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* DESKTOP RIGHT / MOBILE TOP: The Form Card */}
        <div className="w-full order-1 lg:order-2 lg:sticky lg:top-32">
          
          {/* Mobile Only Tag */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-feature-bg/5 text-feature-bg text-[10px] font-bold tracking-[0.2em] uppercase border border-feature-bg/10">
              <MessageCircle className="w-3.5 h-3.5 fill-feature-bg/20" /> WhatsApp Community
            </div>
          </div>

          <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-border shadow-xl shadow-foreground/5 p-6 md:p-12 text-left">
            <div className="mb-6 md:mb-10 text-left">
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
                       <div className="relative shrink-0 w-[95px]">
                         <select 
                           value={formData.countryCode}
                           onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                           className="bg-muted/30 border border-border rounded-2xl pl-3 pr-8 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none w-full h-full cursor-pointer"
                         >
                           {countryCodes.map((c) => (
                             <option key={c.code} value={c.code}>{c.code}</option>
                           ))}
                         </select>
                         <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                       </div>
                       <input 
                        type="tel" 
                        placeholder="Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 bg-muted/30 border border-border rounded-2xl px-5 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-foreground placeholder:text-foreground/20 min-w-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Current Role</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-muted/30 border border-border rounded-2xl pl-4 pr-10 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-foreground cursor-pointer"
                        >
                          <option value="" disabled>Select Role</option>
                          <option>Student</option>
                          <option>Professional</option>
                          <option>Entrepreneur</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Main Interest</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.interest}
                          onChange={(e) => setFormData({...formData, interest: e.target.value})}
                          className="w-full bg-muted/30 border border-border rounded-2xl pl-4 pr-10 py-3.5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-foreground cursor-pointer"
                        >
                          <option value="" disabled>Select Interest</option>
                          <option>Relationships</option>
                          <option>Career</option>
                          <option>Mindset</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
               </div>

               <div className="pt-2 space-y-2">
                 <label className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/10 cursor-pointer group transition-all hover:bg-muted/20">
                   <div className="relative flex items-center justify-center">
                     <input type="checkbox" className="peer sr-only" checked={getGuide} onChange={() => setGetGuide(!getGuide)} />
                     <div className="relative flex items-center justify-center w-5 h-5">
                        <Check className={`w-5 h-5 transition-all ${getGuide ? 'text-foreground opacity-100' : 'text-foreground/20'}`} strokeWidth={4} />
                     </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-foreground/80 leading-none">Get "Hard Earned Lessons" PDF</span>
                      <span className="text-[9px] text-foreground/40 uppercase tracking-wider font-bold mt-1">Free Resource</span>
                   </div>
                 </label>

                 <label className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/10 cursor-pointer group transition-all hover:bg-muted/20">
                   <div className="relative flex items-center justify-center">
                     <input type="checkbox" className="peer sr-only" checked={getNewsletter} onChange={() => setGetNewsletter(!getNewsletter)} />
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

               <button type="submit" disabled={isLoading}
                 className="w-full h-14 md:h-16 bg-[#2A3B5C] hover:bg-[#1E2A41] text-white font-bold text-base md:text-lg rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-foreground/10 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isLoading ? "Joining..." : "Join WhatsApp Community"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 px-8 text-center">
        Ishaan Singh &copy; {new Date().getFullYear()} • Privacy First
      </footer>

    </div>
  );
}
