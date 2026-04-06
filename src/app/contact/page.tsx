import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-12">We are here to support your journey. Get in touch with us through any of the channels below.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-card rounded-[2rem] border border-border flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4 font-medium">For inquiries, booking support, and legal concerns.</p>
            <a href="mailto:hello@ishaanlive.in" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              hello@ishaanlive.in
            </a>
          </div>

          <div className="p-8 bg-card rounded-[2rem] border border-border flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-4 font-medium">Available Mon-Fri, 10 AM - 6 PM IST.</p>
            <a href="tel:+919999913516" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              +91 9999913516
            </a>
          </div>
        </div>

        <div className="p-10 bg-card rounded-[3rem] border border-border flex flex-col md:flex-row items-center gap-10 shadow-sm mb-16">
          <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
            <MapPin className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Registered Address</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              B 37 Ashoka Apartment Sector 9<br />
              Rohini, New Delhi 110085<br />
              India
            </p>
          </div>
        </div>

        {/* Support hub link */}
        <div className="flex flex-col items-center text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-6">Looking for a consultation or community support?</p>
          <Link href="/talk-with-me" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:scale-105 transition-all">
            <MessageCircle className="w-5 h-5" /> Visit Support Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
