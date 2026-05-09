"use client";

import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, BookOpen, Zap, Check, ArrowRight, Download, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

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

const getPhoneValidationError = (countryCodeStr: string, localPhone: string): string => {
  const digits = localPhone.replace(/\D/g, "");
  if (!digits) return "Phone number is required.";

  const codeMatch = countryCodeStr.match(/\+(\d+)/);
  const prefix = codeMatch ? codeMatch[1] : "";

  if (prefix === "91") {
    if (digits.length !== 10) {
      return "Indian WhatsApp number must be exactly 10 digits.";
    }
  } else if (prefix === "1") {
    if (digits.length !== 10) {
      return "USA/Canada phone number must be exactly 10 digits.";
    }
  } else if (prefix === "44") {
    if (digits.length !== 10 && digits.length !== 11) {
      return "UK phone number must be 10 or 11 digits.";
    }
  } else if (prefix === "971") {
    if (digits.length !== 9) {
      return "UAE phone number must be exactly 9 digits.";
    }
  } else {
    if (digits.length < 7 || digits.length > 15) {
      return "International phone number must be between 7 and 15 digits.";
    }
  }
  return "";
};

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [getGuide, setGetGuide] = useState(true);
  const [whatsappUrl, setWhatsappUrl] = useState("https://whatsapp.com/channel/0029VbCdMZNDeON0bXzKBy0B");
  const [getNewsletter, setGetNewsletter] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "🇮🇳 +91"
  });

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const pathname = usePathname();

  const triggerPopup = useCallback(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");
    if (!hasSeenPopup && !isOpen && !isSubmitted) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenExitPopup", "true");
    }
  }, [isOpen, isSubmitted]);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setWhatsappUrl("whatsapp://channel/0029VbCdMZNDeON0bXzKBy0B");
    }

    const mouseOutHandler = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY < 50) triggerPopup();
    };

    const scrollHandler = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.85) triggerPopup();
    };

    document.addEventListener("mouseout", mouseOutHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      document.removeEventListener("mouseout", mouseOutHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [triggerPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict validations
    const pErr = getPhoneValidationError(formData.countryCode, formData.phone);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(formData.email);

    if (pErr) {
      setPhoneError(pErr);
      return;
    }
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/join-community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          phone: `${formData.countryCode} ${formData.phone}`,
          role: "Not Specified", 
          interest: "Not Specified",
          getGuide, 
          getNewsletter 
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        // 1. Trigger Auto-Download if guide is checked
        if (getGuide) {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = "https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh";
          document.body.appendChild(iframe);
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 3000);
        }

        // 2. Instant Redirect to WhatsApp
        window.location.href = whatsappUrl;
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      alert('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 selection:bg-primary/20">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl border border-border flex flex-col md:flex-row overflow-hidden">
        
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-muted/50 backdrop-blur-md rounded-full flex items-center justify-center border border-border text-foreground/40 hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center space-y-6">
             <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
               <Check className="w-10 h-10 text-emerald-600" />
             </div>
             <h2 className="text-3xl font-serif font-bold text-foreground">You're in!</h2>
             <p className="text-foreground/60 max-w-sm mx-auto">
               {alreadySubscribed 
                 ? "We noticed you're already in our newsletter! Here is your community link." 
                 : "Welcome to the Inner Circle. Your journey starts now."}
             </p>
             <a 
               href={whatsappUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full max-w-xs h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
             >
               <MessageCircle className="w-5 h-5 fill-white" /> Join WhatsApp Community
             </a>
          </div>
        ) : (
          <>
            {/* Left Side - Desktop Value Prop */}
            <div className="hidden md:flex flex-col w-[35%] bg-muted/30 p-10 relative overflow-hidden border-r border-border">
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 text-[10px] font-bold uppercase tracking-widest w-fit mb-6 border border-border">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Community
                </div>
                <h3 className="text-3xl font-serif font-bold text-foreground mb-4 leading-tight">Wait! Before you go...</h3>
                <p className="text-foreground/50 text-sm leading-relaxed mb-8">Join the Circle for exclusive life and relationship strategies sent to your phone.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#F9A826] mt-1" />
                    <div><h4 className="text-sm font-bold">Weekly Insights</h4><p className="text-xs text-foreground/40">No fluff, just results.</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                    <div><h4 className="text-sm font-bold">Curated Resources</h4><p className="text-xs text-foreground/40">Handpicked guides.</p></div>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-border flex items-center gap-3">
                  <img src="/images/coach4.png" alt="Ishaan" className="w-10 h-10 rounded-full border border-border object-cover" />
                  <div><p className="text-sm font-bold">Ishaan Singh</p><p className="text-[10px] uppercase font-bold text-foreground/30">Founder</p></div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 sm:p-12">
               <div className="md:hidden text-center mb-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 text-[10px] font-bold uppercase tracking-widest w-fit mb-4 border border-border">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Community
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-foreground">The Inner Circle</h3>
               </div>

               <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <input type="text" placeholder="Your name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-muted/30 border border-border rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                    <div className="space-y-1">
                      <input type="email" placeholder="Email address" required value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ ...formData, email: val });
                          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
                            setEmailError("Please enter a valid email address.");
                          } else {
                            setEmailError("");
                          }
                        }}
                        className={`w-full bg-muted/30 border ${emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-border focus:ring-primary/50"} rounded-xl px-5 py-4 text-sm outline-none transition-all`} />
                      {emailError && <p className="text-red-500 text-[10px] font-semibold mt-1 ml-1">{emailError}</p>}
                    </div>
                    
                    {/* Fixed Country Code/Phone Row for S20 Ultra */}
                    <div className="space-y-1">
                      <div className="flex gap-2 w-full">
                         <div className="relative shrink-0">
                           <select value={formData.countryCode} 
                             onChange={(e) => {
                               const code = e.target.value;
                               setFormData({ ...formData, countryCode: code });
                               const err = getPhoneValidationError(code, formData.phone);
                               setPhoneError(err);
                             }}
                             className="bg-muted/30 border border-border rounded-xl pl-3 pr-8 py-4 text-xs focus:ring-2 focus:ring-primary/50 outline-none appearance-none h-full cursor-pointer">
                             {countryCodes.map((c) => (
                               <option key={c.code} value={c.code}>
                                 {c.code} — {c.name}
                               </option>
                             ))}
                           </select>
                           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                         </div>
                         <input type="tel" placeholder="WhatsApp Number" required value={formData.phone}
                           onChange={(e) => {
                             const digitsOnly = e.target.value.replace(/\D/g, "");
                             setFormData({ ...formData, phone: digitsOnly });
                             const err = getPhoneValidationError(formData.countryCode, digitsOnly);
                             setPhoneError(err);
                           }}
                           className={`flex-1 bg-muted/30 border ${phoneError ? "border-red-500/50 focus:ring-red-500/20" : "border-border focus:ring-primary/50"} rounded-xl px-5 py-4 text-sm outline-none min-w-0 transition-all`} />
                      </div>
                      {phoneError && <p className="text-red-500 text-[10px] font-semibold mt-1 ml-1">{phoneError}</p>}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input type="checkbox" className="peer sr-only" checked={getGuide} onChange={() => setGetGuide(!getGuide)} />
                        <Check className={`w-5 h-5 transition-all ${getGuide ? 'text-foreground opacity-100' : 'text-foreground/10'}`} strokeWidth={4} />
                      </div>
                      <span className="text-xs text-foreground/60 group-hover:text-foreground">Get <strong className="text-foreground">"Hard Earned Lessons"</strong> PDF for free.</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input type="checkbox" className="peer sr-only" checked={getNewsletter} onChange={() => setGetNewsletter(!getNewsletter)} />
                        <Check className={`w-5 h-5 transition-all ${getNewsletter ? 'text-foreground opacity-100' : 'text-foreground/10'}`} strokeWidth={4} />
                      </div>
                      <span className="text-xs text-foreground/60 group-hover:text-foreground">Subscribe to weekly insights newsletter.</span>
                    </label>
                  </div>

                  <div className="pt-6">
                    <button type="submit" disabled={isLoading}
                      className="w-full bg-[#2A3B3C] hover:bg-black text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                    >
                       {isLoading ? "Joining..." : "Join WhatsApp Community"} <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-foreground/30 mt-6">Your data is safe • No spam</p>
                  </div>
               </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
