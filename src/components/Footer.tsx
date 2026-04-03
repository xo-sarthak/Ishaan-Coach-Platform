import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold text-lg">Subscribe to my Newsletter</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Get practical advice on life and relationships delivered to your inbox every week.
          </p>
          <div className="flex max-w-sm gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Join
            </button>
          </div>
        </div>

        <div className="flexgap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/courses" className="hover:text-foreground">Courses</Link></li>
              <li><Link href="/cohorts" className="hover:text-foreground">Cohorts</Link></li>
              <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Contact</h4>
            <a
              href="{getWhatsAppLink()}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Coach Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
