import { Gift } from "lucide-react";
import Link from "next/link";

const GIFTS = [
  {
    id: "1",
    title: "Premium Mechanical Keyboard",
    category: "Tech & Setup",
    description: "The perfect gift for anyone who spends hours typing. Enhances productivity and makes working a joy.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop",
    link: "#",
    price: "₹12,499+",
  },
  {
    id: "2",
    title: "High-Quality Noise Cancelling Headphones",
    category: "Audio",
    description: "Give the gift of focus. Nothing beats putting on headphones and entering a state of deep work.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop",
    link: "#",
    price: "₹24,990",
  },
  {
    id: "3",
    title: "The Five Minute Journal",
    category: "Mindfulness",
    description: "A simple yet powerful tool for building a gratitude habit and starting the day with a positive mindset.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    link: "#",
    price: "₹2,499",
  },
  {
    id: "4",
    title: "Ergonomic Office Chair",
    category: "Health & Posture",
    description: "Investing in back health is investing in one's career. A solid chair is the most overlooked essential.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop",
    link: "#",
    price: "₹28,990+",
  },
];

export default function GiftRecommendationsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background pb-20">
      <div className="w-full bg-primary/5 border-b border-border/40 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Gift Recommendations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My hand-picked selection of meaningful, highly practical gifts that people will actually use and love.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {GIFTS.map((gift) => (
            <div key={gift.id} className="flex flex-col bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="aspect-[4/3] w-full bg-muted relative">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full tracking-wide">
                    {gift.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold pr-4">{gift.title}</h3>
                  <span className="shrink-0 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    {gift.price}
                  </span>
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {gift.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={gift.link}
                    className="inline-flex items-center justify-center w-full rounded-xl bg-muted text-foreground px-6 py-3 text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    View Product
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
