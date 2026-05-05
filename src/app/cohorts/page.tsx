import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { COHORTS } from "@/data/cohorts";

export const metadata = {
  title: "Cohorts | Transformative Group Learning",
  description: "Join upcoming live cohorts and build resilience in a community.",
};

export default function CohortsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-16 text-left max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Live Cohorts</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          High-accountability, intensive group programs designed to force execution. Join a vetted community of ambitious peers.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {COHORTS.map((cohort) => (
          <Link 
            key={cohort.id} 
            href={`/cohorts/${cohort.slug}`} 
            className="group block bg-card rounded-[2.5rem] border border-border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col relative"
          >
            <div className="aspect-video w-full bg-muted relative">
              <img src={cohort.image} alt={cohort.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold uppercase tracking-widest shadow-lg">
                {cohort.status === "Waitlist" ? (
                  <><Calendar className="w-3.5 h-3.5 text-yellow-500" /> Waitlist Open</>
                ) : (
                  <><Calendar className="w-3.5 h-3.5 text-primary" /> Enrollment Open</>
                )}
              </div>
            </div>
            
            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-primary text-sm font-bold tracking-wider uppercase">{cohort.subtitle}</span>
                 <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full flex items-center gap-1.5">
                   <Calendar className="w-3 h-3" /> Starts {cohort.startDate}
                 </span>
              </div>
              <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors">{cohort.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-2">{cohort.description}</p>
              
              <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
                 <div>
                    <span className="text-2xl font-bold">{cohort.price}</span> 
                    {/* <span className="text-sm text-muted-foreground line-through ml-2">{cohort.originalPrice}</span> */}
                 </div>
                  <div className="flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors bg-muted px-4 py-2 rounded-full group-hover:bg-primary/10">
                   {cohort.status === "Waitlist" ? "Join Waitlist" : "Enroll Now"} <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
