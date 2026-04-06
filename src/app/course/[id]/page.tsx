"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { COURSES } from "@/data/courses";
import { PlayCircle, ShieldIcon, Loader2, FileDown } from "lucide-react";

export default function ProtectedCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  const course = COURSES.find((c) => c.slug === resolvedParams.id || c.id === resolvedParams.id);

  useEffect(() => {
    if (!course) {
        setIsLoading(false);
        return;
    }

    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/auth");
        return;
      }

      const { data: purchaseData } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", course.id)
        .single();
        
      if (purchaseData) {
        setHasAccess(true);
      } else {
        router.push(`/courses/${course.slug}`);
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [course, router]);

  if (!course) {
    return <div className="text-center p-20 text-2xl font-bold text-foreground">Course Not Found</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground font-medium">Verifying Secure Access...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Currently redirecting in useEffect, renders nothing in interim
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-8 bg-emerald-500/10 w-max px-4 py-2 rounded-full border border-emerald-500/20">
          <ShieldIcon className="w-4 h-4" />
          <span className="font-bold text-xs tracking-widest uppercase">Secure Access Verified</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">{course.title}</h1>
        <p className="text-xl text-muted-foreground mb-12">{course.subtitle}</p>

        {/* Video Player Placeholder */}
        <div className="aspect-video w-full bg-card rounded-[2rem] border border-border shadow-2xl flex items-center justify-center overflow-hidden relative mb-12 relative group cursor-pointer">
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-white p-6 transition-all group-hover:bg-black/40">
            <PlayCircle className="w-20 h-20 mb-6 opacity-90 transition-transform group-hover:scale-110" />
            <h2 className="text-2xl font-bold mb-2">Private Video Player</h2>
            <p className="text-white/80 text-center max-w-md">Your secure video stream will begin playing here. Video host integration pending.</p>
          </div>
          <img src={course.image} alt={course.title} className="w-full h-full object-cover blur-sm opacity-60 transition-transform group-hover:scale-105 duration-700" />
        </div>
        
        {/* Resources Placeholder */}
        <div className="p-8 md:p-10 bg-card rounded-[2rem] border border-border flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Downloads & Materials</h3>
                <p className="text-muted-foreground">Access your workbook and assignment guides associated with this masterclass.</p>
            </div>
            
            <button className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shrink-0">
                <FileDown className="w-5 h-5" />
                Download Workbook
            </button>
        </div>
      </div>
    </div>
  );
}
