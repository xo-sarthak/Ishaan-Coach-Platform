export interface ResourceData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
  benefits: string[];
  howToUse: string;
  downloadUrl: string;
  reviews: string;
  rating: string;
}

export const RESOURCES: ResourceData[] = [
  {
    id: "r1",
    slug: "the-long-distance-relationship-survival-kit",
    title: "The Long Distance Relationship Survival Kit",
    subtitle: "How to make long distance easy",
    tag: "Survival Kit",
    image: "/free-resources/long-distance-trial.png",
    description: "A no-BS digital guide to surviving long distance—better communication, deeper connection, and real ways to stay close even when you're far.",
    benefits: [
      "Strengthens communication so small misunderstandings don’t turn into big fights.",
      "Builds trust that lasts through months of separation.",
      "Gives you structured ways to spend quality time together, even online.",
      "Helps you handle jealousy and insecurity before they spiral."
    ],
    howToUse: "Don’t just read it, use it together. Hop on a call, go page by page, and talk it out. Be real, not perfect. Come back to it whenever things feel off.",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1QacdPW_E-6L5YF8epTctJFJDby1Hnqbf",
    reviews: "100",
    rating: "4.6"
  },
  {
    id: "r2",
    slug: "how-to-get-over-a-breakup",
    title: "How to Get Over a Breakup",
    subtitle: "Learn about coping up after a relationship ends",
    tag: "Guide",
    image: "/free-resources/get-over-a-breakup.png",
    description: "A practical digital guide designed to help you heal after a breakup, rebuild your confidence, and move forward with clarity. It walks you step-by-step through processing emotions, breaking unhealthy patterns, and creating a stronger version of yourself.",
    benefits: [
      "Helps you process emotions instead of suppressing them",
      "Breaks unhealthy attachment and overthinking cycles.",
      "Rebuilds confidence and personal direction",
      "Turns pain into fuel for growth"
    ],
    howToUse: "Don’t rush through it. Take your time with each section. Be honest with yourself. This is for your eyes only. Use it to understand what went wrong, what you learned, and how to build something better next time.",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1ZK1b8lS85vLRRSTMkZ8WqE6nFRhj3S2U",
    reviews: "80",
    rating: "4.8"
  },
  {
    id: "r3",
    slug: "hard-earned-lessons",
    title: "Hard Earned Lessons",
    subtitle: "10 Life Lessons",
    tag: "Guide",
    image: "/free-resources/hard-earned-lesson.png",
    description: "A practical digital guide that shares 10 powerful life lessons to help you think clearly, make better decisions, and build a life aligned with your values. It’s based on real experiences and designed to give you clarity, direction, and control over your life.",
    benefits: [
      "Helps you gain clarity on decisions and life direction",
      "Builds a strong mindset rooted in accountability and purpose",
      "Teaches you to handle relationships, money, and career with maturity",
      "Gives you practical wisdom that actually works in real life"
    ],
    howToUse: "Read one lesson at a time and reflect on how it applies to your life. Don’t rush, pause, think, and internalize each idea. Apply what resonates and ignore what doesn’t. Revisit it whenever you feel lost or need direction.",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1TwvuexouTIwMH-mdWFBkf4dhMQGTS0sh",
    reviews: "50",
    rating: "4.5"
  }
  // {
  //   id: "r4",
  //   slug: "habit-tracker-printable",
  //   title: "Habit Tracker Printable",
  //   subtitle: "Don't break the chain",
  //   tag: "Template",
  //   image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
  //   description: "A minimalist, aesthetically pleasing 30-day habit tracker grid that relies on the psychological power of visual streaks.",
  //   benefits: [
  //     "Provides immediate dopamine for completing daily micro-tasks.",
  //     "Offers a stark, undeniable visual reality of your consistency.",
  //     "Simple design doesn't require complex app navigation.",
  //     "Easily customizable for workouts, reading, or diet."
  //   ],
  //   howToUse: "Print it out and tape it to your bathroom mirror or fridge. Pick a maximum of 3 habits. Put an 'X' in the box every single day you complete the task. Don't break the chain.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r5",
  //   slug: "goal-setting-framework",
  //   title: "Goal Setting Framework",
  //   subtitle: "The 12-week year",
  //   tag: "PDF Guide",
  //   image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
  //   description: "An actionable framework that condenses annual goals into urgent 12-week sprints, multiplying your execution speed.",
  //   benefits: [
  //     "Prevents the common 'November panic' when annual goals are unmet.",
  //     "Creates artificial urgency, entirely eliminating procrastination.",
  //     "Forces you to break down massive ambitions into daily levers.",
  //     "Makes tracking progress highly mathematical and objective."
  //   ],
  //   howToUse: "Download the framework and set up your next 12-week sprint. Define your primary goal, the specific daily actions required, and use the weekly scorecard to hold yourself ruthlessly accountable.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r6",
  //   slug: "mindfulness-basics",
  //   title: "Mindfulness Basics",
  //   subtitle: "Calm the chaos",
  //   tag: "E-Book",
  //   image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
  //   description: "A completely non-mystical, practical introduction to meditation and mindfulness for highly analytical overthinkers.",
  //   benefits: [
  //     "Instantly lowers baseline cortisol levels and stress.",
  //     "Improves the ability to separate your identity from your thoughts.",
  //     "Enhances deep focus when working on complex problems.",
  //     "Helps you fall asleep faster without a racing mind."
  //   ],
  //   howToUse: "Read the short booklet over a weekend. Follow the specific 5-minute breathing exercise detailed in Chapter 2 every morning for the next seven days to see immediate physiological results.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r7",
  //   slug: "budgeting-spreadsheet",
  //   title: "Budgeting Spreadsheet",
  //   subtitle: "Track every penny",
  //   tag: "Template",
  //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  //   description: "An effortless Notion/Excel template that visually maps your income, fixed expenses, and guilt-free spending money.",
  //   benefits: [
  //     "Provides absolute clarity on exactly where your money goes.",
  //     "Highlights exactly how much you can invest or save automatically.",
  //     "Removes the guilt from spending money on things you love.",
  //     "Takes less than 15 minutes a month to maintain."
  //   ],
  //   howToUse: "Download the template, plug in your monthly take-home pay, list your fixed utility/rent costs, and the spreadsheet will automatically calculate your exact fun-money allowance.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r8",
  //   slug: "morning-routine-checklist",
  //   title: "Morning Routine Checklist",
  //   subtitle: "Win the morning",
  //   tag: "PDF Guide",
  //   image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=600&auto=format&fit=crop",
  //   description: "A realistic, scalable morning routine checklist that doesn't require waking up at 4 AM or taking ice baths.",
  //   benefits: [
  //     "Builds momentum immediately after waking up.",
  //     "Ensures hydration, movement, and mental clarity before checking emails.",
  //     "Easily adaptable to 10-minute or 60-minute time frames.",
  //     "Reduces decision fatigue early in the day."
  //   ],
  //   howToUse: "Review the checklist. Decide if you are running the 'short' routine (15 mins) or the 'long' routine (45 mins) based on your schedule, and check off the items. Keep it by your bedside.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r9",
  //   slug: "overcoming-procrastination",
  //   title: "Overcoming Procrastination",
  //   subtitle: "The 2-minute rule",
  //   tag: "E-Book",
  //   image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  //   description: "A psychological deep dive into why we avoid difficult tasks and exactly how to trick our brain into starting them.",
  //   benefits: [
  //     "Explains the connection between anxiety and avoidance.",
  //     "Provides tactical 'friction-reduction' strategies to guarantee task-starting.",
  //     "Helps you forgive yourself for past bouts of unproductivity.",
  //     "Defines exactly how to handle massive, overwhelming projects."
  //   ],
  //   howToUse: "Read this short guide whenever you feel hopelessly stuck on a major project. Apply the '2-minute rule' highlighted in the guide immediately upon reaching the final page to break the inertia.",
  //   downloadUrl: "#"
  // },
  // {
  //   id: "r10",
  //   slug: "self-reflection-journal-prompts",
  //   title: "Self-Reflection Journal Prompts",
  //   subtitle: "Audit your life",
  //   tag: "Template",
  //   image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
  //   description: "A collection of 50 aggressive and uncovering journal prompts designed to force you to be brutally honest with yourself.",
  //   benefits: [
  //     "Exposes limiting beliefs you didn't know you harbored.",
  //     "Helps articulate vague feelings of dissatisfaction clearly.",
  //     "Provides phenomenal clarity on what you actually want out of life.",
  //     "Acts as cheaper, rapid-fire self-administered therapy."
  //   ],
  //   howToUse: "Sit down in a quiet room with a physical notebook. Do not use a laptop. Pick one prompt at random, set a timer for 10 minutes, and do not stop writing until the timer sounds.",
  //   downloadUrl: "#"
  // }
];
