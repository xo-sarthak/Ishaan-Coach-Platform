import { notFound } from "next/navigation";
import { RESOURCES } from "@/data/resources";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { CheckCircle2, ChevronRight, FileText, Download, Sparkles, BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ resourceId: string }> }) {
  const resolvedParams = await params;
  const resource = RESOURCES.find((r) => r.slug === resolvedParams.resourceId || r.id === resolvedParams.resourceId);
  if (!resource) return { title: "Resource Not Found" };
  return {
    title: `${resource.title} | Free Download`,
    description: resource.description,
  };
}

export default async function ResourceLandingPage({ params }: { params: Promise<{ resourceId: string }> }) {
  const resolvedParams = await params;
  const resource = RESOURCES.find((r) => r.slug === resolvedParams.resourceId || r.id === resolvedParams.resourceId);

  if (!resource) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center w-full bg-background selection:bg-primary/20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-border bg-card">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col order-2 md:order-1 items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
               <FileText className="w-4 h-4 fill-primary/20" /> Free {resource.tag}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
              {resource.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 font-semibold mb-6">
              {resource.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
              {resource.description}
            </p>

            {/* Email Form Desktop */}
            <div className="hidden md:block w-full max-w-md bg-background border border-border p-6 rounded-[2rem] shadow-2xl shadow-primary/5">
               <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm tracking-wide uppercase text-foreground">Where should we send it?</span>
               </div>
               <EmailCaptureForm resourceId={resource.id} />
            </div>
          </div>

          <div className="order-1 md:order-2 w-full flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-border shadow-2xl group animate-in slide-in-from-right duration-1000">
               <img src={resource.image} alt={resource.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. MOBILE EMAIL FORM (Visible only on mobile for better UX flow) */}
      <section className="w-full px-6 py-12 md:hidden bg-background">
         <div className="w-full bg-card border border-border p-6 rounded-3xl shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-6">
               <Download className="w-5 h-5 text-primary" />
               <span className="font-bold text-sm tracking-wide uppercase text-foreground">Where should we send it?</span>
            </div>
            <EmailCaptureForm resourceId={resource.id} />
         </div>
      </section>

      {/* 3. VALUE PROPOSITION SECTION */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why you need this {resource.tag.toLowerCase()}</h2>
            <p className="text-lg text-muted-foreground">It's designed to give you immediate leverage.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {resource.benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-lg font-medium text-foreground leading-relaxed pt-1.5">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTEXT / HOW TO USE */}
      <section className="w-full py-24 bg-muted/30 border-t border-border">
         <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
               <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">How to use it effectively</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               {resource.howToUse}
            </p>
         </div>
      </section>

    </div>
  );
}
