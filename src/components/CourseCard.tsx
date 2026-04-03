import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  href: string;
  price?: string;
}

export default function CourseCard({ title, description, href, price }: CourseCardProps) {
  return (
    <div className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-medium text-lg">{price || "View Details"}</span>
        <a
          href={href}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all group-hover:bg-primary/90 group-hover:gap-3"
        >
          Buy Now <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
