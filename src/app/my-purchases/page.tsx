"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { COURSES } from "@/data/courses";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, Play, BookOpen } from "lucide-react";

export default function MyPurchases() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
          router.push("/auth");
          return;
      }

      const { data, error } = await supabase
        .from("purchases")
        .select("course_id, created_at")
        .eq("user_id", session.user.id);
        
      if (data) {
        // Hydrate data from the COURSES constant using the stored ID
        const matched = data.map(purchase => {
           const courseInfo = COURSES.find(c => c.id === purchase.course_id || c.slug === purchase.course_id);
           return {
               ...courseInfo,
               purchaseDate: new Date(purchase.created_at).toLocaleDateString()
           }
        }).filter(c => c.id); // removes undefined matches
        
        setPurchasedCourses(matched);
      }
      setLoading(false);
    };

    fetchPurchases();
  }, [router]);

  return (
    <div className="w-full min-h-[80vh] bg-background pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black mb-4">My Purchases</h1>
        <p className="text-xl text-muted-foreground mb-12">Resume your masterclasses and access your private materials.</p>

        {loading ? (
            <div className="py-20 flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        ) : purchasedCourses.length === 0 ? (
            <div className="p-12 text-center border border-border border-dashed rounded-3xl bg-card">
                <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">No courses unlocked yet</h3>
                <p className="text-muted-foreground mb-8">Ready to master your life and relationships?</p>
                <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:scale-105 transition-transform">
                    Explore Masterclasses
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {purchasedCourses.map((course, idx) => (
                    <div key={idx} className="bg-card rounded-[2rem] border border-border p-3 flex flex-col group overflow-hidden">
                        <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative mb-5 flex-shrink-0 bg-muted">
                            <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1 bg-primary/20 px-2 py-0.5 rounded w-max backdrop-blur-sm">Purchased {course.purchaseDate}</div>
                            </div>
                            
                            <div className="absolute inset-0 m-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                        </div>
                        
                        <div className="px-4 pb-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow mb-6">{course.subtitle}</p>
                            
                            <Link href={`/course/${course.id}`} className="w-full py-3 bg-muted group-hover:bg-primary group-hover:text-primary-foreground text-foreground font-bold rounded-xl flex justify-center items-center gap-2 transition-all">
                                Access Content <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
