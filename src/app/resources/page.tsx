import Link from "next/link";
import { ArrowRight, DownloadCloud } from "lucide-react";
import { RESOURCES } from "@/data/resources";

export const metadata = {
  title: "Free Resources | Tools for Growth",
  description: "Templates, guides, and ebooks to kickstart your journey.",
};

export default function ResourcesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Free Resources</h1>
        <p className="text-lg text-muted-foreground">
          Actionable frameworks, templates, and guides designed specifically to give you clarity and direction immediately.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RESOURCES.map((resource) => (
           <Link key={resource.id} href={`/resources/${resource.slug}`} className="group block bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
             <div className="aspect-[4/3] w-full bg-muted relative">
               <img src={resource.image} alt={resource.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
             </div>
             <div className="p-6 md:p-8 flex flex-col flex-grow">
               {resource.subtitle && <span className="text-primary text-xs font-bold tracking-wider uppercase mb-2">{resource.subtitle}</span>}
               <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{resource.title}</h3>
               <div className="mt-auto flex items-center text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                 Download Now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
           </Link>
        ))}
      </div>
    </div>
  );
}
