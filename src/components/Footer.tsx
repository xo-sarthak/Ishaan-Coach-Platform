import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
  },
  {
    name: "Substack",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.078V0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
];

const FOOTER_COLUMNS = [
  {
    title: "General",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "#" },
      { name: "Contact Us", href: "/contact" },
      { name: "Support Hub", href: "/talk-with-me" },
      { name: "My Account", href: "/auth" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Free Resources", href: "/resources" },
      { name: "Book Recommends", href: "/book-recommendations" },
      { name: "Gift Recommends", href: "/gift-recommendations" },
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
      { name: "AI Life Coach", href: "/ai-life" },
      { name: "AI Relationship Coach", href: "/ai-relationship" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 mt-12 mb-12 bg-white/50 dark:bg-card/50">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link 
              href="/" 
              className="text-2xl font-serif tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              Ishaan Singh
            </Link>
            <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
              &copy; {currentYear} Ishaan Singh. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
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

