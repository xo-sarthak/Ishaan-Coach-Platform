"use client";

import { useState, useEffect } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface ResourceDownloadProps {
  downloadUrl: string;
}

export function ResourceDownload({ downloadUrl }: ResourceDownloadProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
    
    // Optionally listen for auth state changes just in case they sign in on another tab
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleDownloadClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push("/auth");
    }
    // If authenticated, the href works as intended and opens/downloads the file
  };

  if (isAuthenticated === null) {
    return (
      <div className="w-full flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-md w-full mx-auto relative z-10 text-center">
      <a
        href={isAuthenticated ? downloadUrl : "/auth"}
        target={isAuthenticated ? "_blank" : "_self"}
        rel={isAuthenticated ? "noopener noreferrer" : ""}
        onClick={handleDownloadClick}
        className="w-full bg-primary text-primary-foreground font-bold text-lg rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20"
      >
        <FileDown className="w-5 h-5" />
        {isAuthenticated ? "Download Resource Now" : "Sign in to Download"}
      </a>
      {!isAuthenticated && (
        <p className="text-xs text-muted-foreground mt-2">
          Create a free account or sign in to access all our free resources.
        </p>
      )}
    </div>
  );
}
