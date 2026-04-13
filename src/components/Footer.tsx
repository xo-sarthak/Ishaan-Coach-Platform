"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SOCIAL_LINKS } from "@/data/socials";

const FOOTER_COLUMNS = [
  {
    title: "General",
    links: [
      { name: "Home", href: "/" },
      { name: "Newsletter", href: "/#newsletter" },
      { name: "Contact Us", href: "/contact" },
      { name: "My Account", href: "/auth" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Free Resources", href: "/resources" },
      { name: "Book Recommends", href: "/book-recommendations" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Cancellation Policy", href: "/cancellation-policy" },
    ],
  },
  {
    title: "Offerings",
    links: [
      { name: "Courses", href: "/courses" },
      { name: "Cohorts", href: "/cohorts" },
      // { name: "AI Life Coach", href: "/ai-life" },
      // { name: "AI Relationship Coach", href: "/ai-relationship" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewsletterClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-border/40 mt-12 mb-12 bg-white/50 dark:bg-card/50">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="hover:opacity-80 transition-opacity flex items-center"
              >
                <img
                  src="/images/ishaan-live-logo-trial.png"
                  alt="IshaanLive Logo"
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
                &copy; {currentYear} Ishaan Singh. All rights reserved.
              </p>
            </div>

            {/* Support / Help Section */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                For any queries or collaborations, reach out to:
                <br />
                <a
                  href="mailto:hello@ishaanlive.in"
                  className="text-lg font-bold text-primary hover:text-foreground transition-colors underline decoration-primary/20 underline-offset-8"
                >
                  hello@ishaanlive.in
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="space-y-6">
              <h3 className="font-semibold text-sm tracking-wide text-foreground underline decoration-muted-foreground/30 underline-offset-8">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={
                        link.href === "/" 
                          ? handleHomeClick 
                          : link.name === "Newsletter" 
                            ? handleNewsletterClick 
                            : undefined
                      }
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

