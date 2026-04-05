import { notFound } from "next/navigation";
import { COURSES } from "@/data/courses";
import { Accordion } from "@/components/Accordion";
import { PAYMENT_LINK } from "@/lib/payment";
import Link from "next/link";
import { CheckCircle2, PlayCircle, Star, XCircle, Clock, ShieldCheck, Globe2, AlertTriangle, ArrowRight, Quote } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  const course = COURSES.find((c) => c.slug === resolvedParams.courseId || c.id === resolvedParams.courseId);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | Premium Masterclass`,
    description: course.description,
  };
}

export default async function CourseFunnelPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  // Find course either by slug or id
  const course = COURSES.find((c) => c.slug === resolvedParams.courseId || c.id === resolvedParams.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center w-full bg-background selection:bg-primary/20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative py-20 md:py-32 overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0 opacity-15 dark:opacity-10 blur-xl bg-cover bg-center mix-blend-multiply" style={{ backgroundImage: `url('${course.image}')` }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-8">
             <Star className="w-4 h-4 fill-primary" /> {course.tag}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-10 font-medium">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-semibold text-foreground bg-background rounded-full border border-border py-3 px-6 shadow-sm mb-12">
             <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/> <span className="text-lg">{course.rating} Rating</span></div>
             <div className="hidden sm:block w-px h-6 bg-border" />
             <div className="flex items-center gap-2"><span className="text-lg font-bold">{course.enrollmentCount}</span> Students</div>
          </div>

          {/* Video Placeholder / Asset */}
          <div className="w-full max-w-4xl aspect-video bg-muted rounded-[2rem] border border-border shadow-2xl overflow-hidden relative group cursor-pointer mb-12">
            <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 ml-1" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-muted-foreground text-sm font-medium">
             <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> <span>{course.duration}</span></div>
             <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> <span>100% Refund Policy</span></div>
             <div className="flex items-center gap-2"><Globe2 className="w-4 h-4"/> <span>English & Hindi</span></div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM AGITATION SECTION */}
      <section className="w-full py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Are you struggling with these problems?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            If you catch yourself nodding along to any of these statements, this framework was built precisely for you.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {course.problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-destructive/20 shadow-sm">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                <p className="text-lg font-medium">{problem}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105">
              Achieve Extreme Clarity <ArrowRight className="w-5 h-5"/>
            </a>
          </div>
        </div>
      </section>

      {/* 3. CURRICULUM SECTION */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Course Curriculum</h2>
          <p className="text-lg text-muted-foreground mb-12">Self-paced modules, absolute clarity. Direct and practical.</p>
          
          <div className="text-left mt-8">
            <Accordion 
              items={course.curriculum.map(c => ({
                title: c.module,
                content: c.description
              }))} 
            />
          </div>
        </div>
      </section>

      {/* 4. INSTRUCTOR BIO */}
      <section className="w-full bg-card py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="aspect-square bg-muted rounded-full overflow-hidden border-4 border-background shadow-xl">
               <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" alt="Instructor" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-3">
             <h2 className="text-4xl font-bold mb-4">Meet Your Coach</h2>
             <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                My aim is to ensure all the choices you make in life come from a point of profound awareness, not default programming or ignorance.
             </p>
             <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I've broken down years of research, coaching, and real-world failure into scalable frameworks that you can apply immediately to see tangible results.
             </p>
             <div className="grid grid-cols-2 gap-6">
               <div className="bg-background p-4 rounded-xl border border-border text-center">
                 <div className="text-3xl font-black text-primary mb-1">100k+</div>
                 <div className="text-sm font-semibold text-muted-foreground">Students Taught</div>
               </div>
               <div className="bg-background p-4 rounded-xl border border-border text-center">
                 <div className="text-3xl font-black text-primary mb-1">4.9/5</div>
                 <div className="text-sm font-semibold text-muted-foreground">Average Rating</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="w-full py-24 bg-muted/10">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Results Speak For Themselves</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
               {course.testimonials.map((test, i) => (
                 <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
                   <div>
                     <Quote className="w-10 h-10 text-primary/20 mb-6" />
                     <p className="text-lg leading-relaxed text-foreground mb-8">"{test.text}"</p>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-lg">{test.name}</span>
                     <span className="text-sm text-muted-foreground">Course Graduate</span>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. PRICING */}
      <section id="pricing" className="w-full py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30 text-sm font-black tracking-widest uppercase mb-6 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
              Risk-Free Investment
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Choose the Plan That Fits You Best</h2>
            <p className="text-lg text-muted-foreground">Get lifetime access on a one-time payment. Cancel anytime within 14 days and get a full refund, no questions asked.</p>
          </div>

          <div className={`grid gap-8 items-start mx-auto ${
            course.pricing.length === 1 ? 'lg:grid-cols-1 max-w-md' :
            course.pricing.length === 2 ? 'lg:grid-cols-2 max-w-4xl' :
            'lg:grid-cols-3'
          }`}>
            {course.pricing.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative bg-card rounded-[2rem] border overflow-hidden flex flex-col h-full ${plan.isPopular ? 'border-primary shadow-2xl shadow-primary/20 scale-100 lg:scale-105 z-10' : 'border-border shadow-md'}`}
              >
                {plan.isPopular && (
                  <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground font-medium mb-6">{plan.subtitle}</p>
                  <div className="text-4xl font-black mb-8">{plan.price}</div>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-muted-foreground/30 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={PAYMENT_LINK} 
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all hover:scale-[1.02] ${plan.isPopular ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-primary/50' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="w-full py-24 bg-card border-t border-border pb-40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
          <Accordion 
            items={course.faqs.map(faq => ({
              title: faq.question,
              content: faq.answer
            }))}
          />
        </div>
      </section>

      {/* 8. HIGHLY VISIBLE FLOATING CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/90 to-transparent z-50 flex justify-center pointer-events-none">
        <a 
          href="#pricing"
          className="pointer-events-auto group relative flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-center text-base font-bold tracking-wide text-primary-foreground shadow-[0_15px_40px_-10px_rgba(var(--primary),0.8)] transition-all hover:scale-105 hover:bg-primary/95 ring-4 ring-primary/20 hover:ring-primary/40 animate-bounce"
          style={{ animationDuration: '2.5s' }}
        >
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
          ENROLL NOW <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

    </div>
  );
}
