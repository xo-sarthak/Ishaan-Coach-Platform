import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES } from "@/data/courses";

export const metadata = {
  title: "Courses | Elevate Your Growth",
  description: "Browse premium courses on relationships and life strategy.",
};

export default function CoursesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Masterclasses & Courses</h1>
        <p className="text-lg text-muted-foreground">
          Self-paced, high ROI courses designed to solve specific problems in your life and relationships.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="group block bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
            <div className="aspect-[4/3] w-full bg-muted relative">
              <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              {course.subtitle && <span className="text-primary text-xs font-bold tracking-wider uppercase mb-2">{course.subtitle}</span>}
              <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
              <div className="mt-auto flex items-center text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                Start Learning <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
