"use client";

import Link from "next/link";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Courses", href: "/courses" },
  { name: "Cohorts", href: "/cohorts" },
  { name: "1:1 Session", href: "/book-1-on-1" },
  { name: "Free Resources", href: "/resources" },
  { name: "Book Recommends", href: "/book-recommendations" },
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-6xl backdrop-blur-xl bg-white/90 rounded-full border border-border/60 drop-shadow-sm px-2">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/ishaan-live-logo-trial.png"
            alt="IshaanLive Logo"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-foreground transition-colors whitespace-nowrap">
              {link.name}
            </Link>
          ))}
          {mounted && user && (
            <Link href="/my-purchases" className="hover:text-primary transition-colors whitespace-nowrap font-bold text-foreground">
              My Purchases
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {mounted ? (
            user ? (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-red-600"
              >
                Log out
              </button>
            ) : (
              <Link
                href="/auth"
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Log In
              </Link>
            )
          ) : (
            <div className="hidden sm:flex w-[72px] h-9 bg-muted animate-pulse rounded-md items-center justify-center" />
          )}

          <Link
            href="/contact"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-primary text-primary px-4 py-2 text-sm font-bold transition-all hover:bg-primary/5 active:scale-95"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-foreground -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[4.75rem] left-0 right-0 lg:hidden w-full bg-white/95 backdrop-blur-xl border border-border/70 rounded-[2rem] p-6 shadow-xl animate-in fade-in-0 slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col divide-y divide-border/40">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors px-1"
              >
                {link.name}
              </Link>
            ))}
            {mounted && user && (
              <Link
                href="/my-purchases"
                className="py-3.5 text-base font-bold text-primary hover:text-primary/80 transition-colors px-1"
              >
                My Purchases
              </Link>
            )}

            <div className="pt-4 sm:hidden flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-foreground/15 text-foreground px-4 py-2 text-sm font-bold transition-all hover:bg-muted/50 active:scale-95"
              >
                Contact Us
              </Link>
              {mounted && (
                user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-500/5 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-foreground hover:bg-foreground/90 text-white px-4 py-2 text-sm font-bold transition-colors"
                  >
                    Log In
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
