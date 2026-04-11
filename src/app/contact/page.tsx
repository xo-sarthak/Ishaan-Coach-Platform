import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-foreground">Contact Us</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are here to support your journey. Get in touch with us through our specialized support channels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-card rounded-[2rem] border border-border flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">Email Support</h3>
                  <p className="text-muted-foreground mb-4 text-sm">For inquiries, booking support, and legal concerns.</p>
                  <a href="mailto:hello@ishaanlive.in" className="text-lg font-bold text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4">
                    hello@ishaanlive.in
                  </a>
                </div>
              </div>

              <div className="p-8 bg-card rounded-[2rem] border border-border flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">Registered Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    B 37 Ashoka Apartment Sector 9<br />
                    Rohini, New Delhi 110085<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-24">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
