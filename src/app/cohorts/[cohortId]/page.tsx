import { notFound } from "next/navigation";
import { COHORTS } from "@/data/cohorts";
import { Accordion } from "@/components/Accordion";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PAYMENT_LINK } from "@/lib/payment";
import { CheckCircle2, Calendar, Star, AlertTriangle, ArrowRight, Quote, Clock, Zap } from "lucide-react";
import { CohortWaitlistForm } from "@/components/CohortWaitlistForm";

export async function generateMetadata({ params }: { params: Promise<{ cohortId: string }> }) {
  const resolvedParams = await params;
  const cohort = COHORTS.find((c) => c.slug === resolvedParams.cohortId || c.id === resolvedParams.cohortId);
  if (!cohort) return { title: "Cohort Not Found" };
  return {
    title: `${cohort.title} | Live Program`,
    description: cohort.description,
  };
}

export default async function CohortFunnelPage({ params }: { params: Promise<{ cohortId: string }> }) {
  const resolvedParams = await params;
  const cohort = COHORTS.find((c) => c.slug === resolvedParams.cohortId || c.id === resolvedParams.cohortId);

  if (!cohort) {
    notFound();
  }

  const isWaitlist = cohort.status === "Waitlist";

  return (
    <div className="flex flex-col items-center w-full bg-background selection:bg-primary/20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative py-20 md:py-32 overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-8 ${isWaitlist ? 'bg-yellow-500/10 text-yellow-600' : 'bg-primary/10 text-primary'}`}>
             <Calendar className="w-4 h-4" /> {cohort.status}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {cohort.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-10 font-medium">
            {cohort.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-foreground bg-background rounded-full border border-border py-4 px-8 shadow-sm mb-12">
             <div className="flex items-center gap-2 pr-4 md:pr-6 md:border-r border-border text-primary"><Calendar className="w-5 h-5"/> <span className="text-base">Starts {cohort.startDate}</span></div>
             <div className="flex items-center gap-2 pl-2"><Clock className="w-5 h-5 text-primary"/> <span className="text-base text-muted-foreground">{cohort.schedule}</span></div>
          </div>

          {cohort.videoUrl ? (
            <div className="w-full max-w-5xl mb-12">
              <VideoPlayer 
                videoUrl={cohort.videoUrl} 
                thumbnail={cohort.image} 
                title={cohort.title} 
              />
            </div>
          ) : (
            <div className="w-full max-w-5xl aspect-video rounded-[2rem] border border-border shadow-2xl overflow-hidden relative mb-12">
              <img src={cohort.image} alt={cohort.title} className="w-full h-full object-cover" />
            </div>
          )}

        </div>
      </section>

      {/* 2. BENEFITS / VALUE PROPOSITION */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What you get in this Cohort</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This isn't just a video course you'll forget to watch. It's an active, high-accountability environment demanding real execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {cohort.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-lg font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURRICULUM SECTION */}
      <section className="w-full py-24 bg-muted/30 border-y border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cohort Schedule</h2>
          <p className="text-lg text-muted-foreground mb-12">Exactly what we will cover during our live sessions.</p>
          
          <div className="text-left mt-8">
            <Accordion 
              items={cohort.curriculum.map(c => ({
                title: c.module,
                content: c.description
              }))} 
            />
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      {cohort.testimonials.length > 0 && (
        <section className="w-full py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">From Past Alumni</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                {cohort.testimonials.map((test, i) => (
                  <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
                    <div>
                      <Quote className="w-10 h-10 text-primary/20 mb-6" />
                      <p className="text-lg leading-relaxed text-foreground mb-8">"{test.text}"</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{test.name}</span>
                      <span className="text-sm text-muted-foreground">Cohort Alumni</span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </section>
      )}

      {/* 5. PRICING & CHECKOUT BLOCK */}
      <section id="pricing" className="w-full py-24 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-background rounded-[3rem] border border-primary/20 shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-6">
                  {isWaitlist ? "Waitlist Now Open" : "Enrollment Now Open"}
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  {isWaitlist ? "Get early access." : "Secure your spot."}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {isWaitlist 
                    ? `Join the priority list for ${cohort.title} to get notified the second we open doors.` 
                    : "Limited availability for the upcoming cohort. Enroll now to guarantee your participation."
                  }
                </p>
              </div>

              <div className="w-full md:w-auto relative z-10 bg-card border border-border p-8 rounded-3xl shadow-xl text-center flex flex-col items-center shrink-0 min-w-[320px]">
                {isWaitlist ? (
                  <div id="waitlist" className="w-full">
                    <CohortWaitlistForm cohortId={cohort.id} cohortTitle={cohort.title} />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Investment</p>
                    <div className="text-5xl font-black mb-2 flex items-baseline gap-3">
                      {cohort.price} <span className="text-xl text-muted-foreground line-through font-normal">{cohort.originalPrice}</span>
                    </div>
                    <a 
                      href={PAYMENT_LINK} 
                      className="w-full mt-6 bg-primary text-primary-foreground font-bold text-lg rounded-xl px-12 py-4 flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:scale-105 shadow-xl shadow-primary/20"
                    >
                      Enroll Now <ArrowRight className="w-5 h-5"/>
                    </a>
                    <p className="text-xs text-muted-foreground mt-4 italic">Secure checkout via PayU</p>
                  </>
                )}
              </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      {cohort.faqs.length > 0 && (
        <section className="w-full py-24 bg-background pb-40">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
            <Accordion 
              items={cohort.faqs.map(faq => ({
                title: faq.question,
                content: faq.answer
              }))}
            />
          </div>
        </section>
      )}

      {/* 7. HIGHLY VISIBLE FLOATING CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/90 to-transparent z-50 flex justify-center pointer-events-none">
        <a 
          href={isWaitlist ? "#waitlist" : "#pricing"}
          className="pointer-events-auto group relative flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-center text-base font-bold tracking-wide text-primary-foreground shadow-[0_15px_40px_-10px_rgba(var(--primary),0.8)] transition-all hover:scale-105 hover:bg-primary/95 ring-4 ring-primary/20 hover:ring-primary/40 animate-bounce"
          style={{ animationDuration: '2.5s' }}
        >
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
          {isWaitlist ? "JOIN THE WAITLIST" : "ENROLL NOW"} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

    </div>
  );
}
