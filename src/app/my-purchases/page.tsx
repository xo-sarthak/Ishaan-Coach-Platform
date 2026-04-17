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
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [unmatchedCount, setUnmatchedCount] = useState(0);

  const handleSync = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    setIsSyncing(true);
    setSyncMessage("Searching for purchases...");
    try {
      const res = await fetch("/api/auth/sync-purchases", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (data.synced > 0) {
        setSyncMessage(`Found ${data.synced} purchase(s)!`);
        return true; // Indicate success to fetcher
      }
    } catch (err) {
      console.error("Manual sync failed:", err);
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
        setSyncMessage("");
      }, 2000);
    }
    return false;
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
          router.push("/auth");
          return;
      }

      // Initial auto-sync
      await handleSync();

      const { data, error: fetchError } = await supabase
        .from("purchases")
        .select("course_id, created_at")
        .eq("user_id", session.user.id);
        
      if (fetchError) {
        console.error("Error fetching purchases:", fetchError);
        setError(fetchError.message);
      } else if (data) {
        // Hydrate data from the COURSES constant using the stored ID
        const matched: any[] = [];
        let unmatched = 0;

        data.forEach(purchase => {
           const courseInfo = COURSES.find(c => c.id === purchase.course_id || c.slug === purchase.course_id);
           if (courseInfo) {
               matched.push({
                   ...courseInfo,
                   purchaseDate: new Date(purchase.created_at).toLocaleDateString()
               });
           } else {
               unmatched++;
           }
        });
        
        setPurchasedCourses(matched);
        setUnmatchedCount(unmatched);
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

        {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
                <h3 className="font-bold text-lg mb-2">Database Error</h3>
                <p className="opacity-80 mb-4">{error}</p>
                <p className="text-sm font-medium">This usually means your account lacks permissions (RLS) to view the purchases table. Please run the SQL policy provided by the developer.</p>
            </div>
        )}

        {unmatchedCount > 0 && (
             <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex items-center gap-3">
                <span className="text-lg">⚠️</span>
                <p>Found <strong>{unmatchedCount}</strong> purchase(s) in your account that don't match any current course IDs. This might be due to a recent ID change.</p>
             </div>
        )}

        {loading ? (
            <div className="py-20 flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        ) : purchasedCourses.length === 0 ? (
            <div className="text-center py-20 bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-black mb-4">No purchases found</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">You haven&apos;t purchased any courses yet or they haven&apos;t been linked to your account.</p>
              
              <div className="flex flex-col items-center gap-4">
                <Link 
                  href="/" 
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-all inline-block"
                >
                  Browse Courses
                </Link>
                
                <button 
                  onClick={async () => {
                    const found = await handleSync();
                    if (found) window.location.reload();
                  }}
                  disabled={isSyncing}
                  className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  {isSyncing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {syncMessage || "Syncing..."}</>
                  ) : (
                    <>Missing a purchase? <span className="underline decoration-dotted">Sync with payment email</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {purchasedCourses.map((course, idx) => (
                    <div key={idx} className="bg-card rounded-[2rem] border border-border p-3 flex flex-col group overflow-hidden">
                        <Link href={`/courses/${course.slug}`} className="block flex-shrink-0">
                            <div className="aspect-video w-full rounded-2xl overflow-hidden relative mb-5 flex items-center justify-center bg-white">
                                <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-2"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1 bg-primary/20 px-2 py-0.5 rounded w-max backdrop-blur-sm">Purchased {course.purchaseDate}</div>
                                </div>
                            </div>
                        </Link>

                        <div className="px-3 pb-4 flex flex-col flex-grow">
                            <Link href={`/courses/${course.slug}`} className="block hover:text-primary transition-colors">
                                <h3 className="text-xl font-bold mb-2 leading-tight">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Masterclass by Ishaan Singh
                                </p>
                            </Link>

                            <div className="mt-auto">
                                <Link 
                                    href={`/courses/${course.slug}`} 
                                    className="w-full inline-flex items-center justify-center gap-2 h-14 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-all"
                                >
                                    Access Content <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
