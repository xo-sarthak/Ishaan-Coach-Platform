import { BookOpen } from "lucide-react";
import Link from "next/link";

const BOOKS = [
  {
    id: "1",
    title: "Make Epic Money",
    author: "Ankur Warikoo",
    description: "The book that I wish I was given when I was young. Something that school, college, my family should have taught me but never did.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Finance",
  },
  {
    id: "2",
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    description: "A book to be read, and re-read, whose lines you will underline and think about again and again. Clear the mess in your life.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Self-Help",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones. Practical strategies that will teach you exactly how to master the tiny behaviors.",
    image: "https://images.unsplash.com/photo-1589998059171-98c98c1503c9?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Productivity",
  },
  {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave.",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Finance",
  },
];

export default function BookRecommendationsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-20">
      <div className="w-full bg-primary/5 border-b border-border/40 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Books I Personally Recommend
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated list of books that have profoundly shaped my thinking, habits, and life. These are the ones I recommend to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {BOOKS.map((book) => (
            <div key={book.id} className="flex flex-col bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="aspect-[4/3] w-full bg-muted relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full tracking-wide">
                    {book.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                  By {book.author}
                </p>
                <h3 className="text-2xl font-bold mb-4">{book.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {book.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={book.link}
                    className="inline-flex items-center justify-center w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
