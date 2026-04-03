import { ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
  type: "book" | "gift";
}

export default function ResourceCard({ title, description, href, type }: ResourceCardProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block p-5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm transition-all hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            {type}
          </div>
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}
