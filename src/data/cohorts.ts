export interface CohortData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  status: "Open" | "Waitlist" | "Closed";
  image: string;
  startDate: string;
  schedule: string;
  description: string;
  price: string;
  originalPrice: string;
  seatsTotal: number;
  seatsRemaining: number;
  benefits: string[];
  testimonials: { name: string; text: string }[];
  curriculum: { module: string; description: string }[];
  faqs: { question: string; answer: string }[];
  vimeoId?: string;
  videoUrl?: string;
  liveLink: string;
}

export const COHORTS: CohortData[] = [
  {
    id: "h1",
    slug: "resilience-cohort",
    title: "The Resilience Cohort",
    subtitle: "6-Week Intensive",
    tag: "Live Program",
    status: "Waitlist",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    startDate: "Coming Soon",
    schedule: "Saturdays, 11:00 AM - 1:00 PM IST",
    description: "A 6-week intensive, live program designed to help you build unbreakable confidence, stop overthinking, and take control of your professional and personal life.",
    price: "₹14,999",
    originalPrice: "₹24,999",
    seatsTotal: 50,
    seatsRemaining: 12,
    liveLink: "https://zoom.us/j/ishaan-resilience-live",
    benefits: [
      "6 Weekly Live Q&A and Lecture Sessions",
      "Private WhatsApp community of ambitious peers",
      "Weekly accountability checks and homework",
      "Actionable templates and frameworks",
      "Direct 1-on-1 feedback on your specific situation",
    ],
    curriculum: [
      { module: "Week 1: The Foundation of Identity", description: "Deconstruct your current belief systems and identify the exact narratives holding you back from execution." },
      { module: "Week 2: Emotional Regulation", description: "How to stop anxiety spirals and maintain absolute composure in high-stakes personal or professional situations." },
      { module: "Week 3: High-Value Communication", description: "The art of setting boundaries aggressively but politely. Learning how to say 'No'." },
      { module: "Week 4: Dating & Relationships", description: "Applying resilience to modern romance. Spotting red flags and communicating needs." },
      { module: "Week 5: The Career Pivot", description: "How to command respect in the workplace, negotiate higher, and deal with office politics." },
      { module: "Week 6: Maintenance & Execution", description: "Building the daily systems required to maintain this version of yourself inevitably." },
    ],
    testimonials: [
      { name: "Rahul S.", text: "This cohort fundamentally changed how I view conflict. I no longer avoid it. I manage it gracefully." },
      { name: "Jessica M.", text: "The community alone is worth the price. Being surrounded by 40 other people committed to growth is infectious." },
      { name: "Anish K.", text: "I finally quit my dead-end job after Week 5. The frameworks provided absolute clarity." }
    ],
    faqs: [
      { question: "Will the sessions be recorded?", answer: "Yes. All live Zoom sessions are recorded and made available in the student portal within 24 hours." },
      { question: "How much time is required outside of the live calls?", answer: "Expect to spend about 2 hours per week on the required readings and accountability homework." },
      { question: "Is there a refund policy?", answer: "Yes, we offer a 100% money-back guarantee if you attend the first two weeks and decide the program isn't for you." }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "h2",
    slug: "relationship-deep-dive",
    title: "Relationship Deep Dive",
    subtitle: "Navigate Modern Romance",
    tag: "Live Program",
    status: "Waitlist",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop",
    startDate: "Coming Spring 2027",
    schedule: "Sundays, 2:00 PM - 4:00 PM IST",
    description: "A comprehensive 4-week teardown of modern dating dynamics, attachment styles, and long-term partnership building.",
    price: "₹9,999",
    originalPrice: "₹15,999",
    seatsTotal: 30,
    seatsRemaining: 0,
    liveLink: "https://zoom.us/j/ishaan-relationship-deepdive",
    benefits: [
      "4 Live Lecture & Teardown Sessions",
      "Roleplaying communication exercises",
      "Private feedback channel",
      "Curated reading list"
    ],
    curriculum: [
      { module: "Week 1: Attachment Theory", description: "Understanding your anxious or avoidant tendencies." },
      { module: "Week 2: The Talking Stage", description: "How to text, filter, and plan high-conversion dates." },
      { module: "Week 3: Conflict Resolution", description: "Navigating first fights without damaging the foundation." },
      { module: "Week 4: Long-Term Compatibility", description: "The definitive checklist for identifying a life partner." },
    ],
    testimonials: [
      { name: "Sarah L.", text: "I finally recognized my toxic patterns and stopped chasing emotionally unavailable men." }
    ],
    faqs: [
      { question: "Is this only for single people?", answer: "No, this is highly beneficial for people currently in relationships looking to improve their communication." }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];
