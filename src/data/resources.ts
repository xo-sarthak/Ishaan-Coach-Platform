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
}

export const RESOURCES: ResourceData[] = [
  {
    id: "r1",
    slug: "the-failure-resume-template",
    title: "The Failure Resume Template",
    subtitle: "Reframe your losses",
    tag: "Template",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
    description: "A printable template designed to help you document and reframe your biggest professional and personal failures into actionable growth vectors.",
    benefits: [
      "Immediately reduces the emotional weight of past mistakes.",
      "Identifies hidden patterns in why certain projects failed.",
      "Helps you confidently answer the 'biggest failure' interview question.",
      "Shifts your mindset from victim to active learner."
    ],
    howToUse: "Print this single-page PDF and keep it in your journal. Whenever you face a major rejection or failure, fill out a row. Over time, you'll see how these 'failures' were actually prerequisites for your biggest wins."
  },
  {
    id: "r2",
    slug: "weekly-planning-routine",
    title: "Weekly Planning Routine",
    subtitle: "Take back your Sundays",
    tag: "PDF Guide",
    image: "https://images.unsplash.com/photo-1507925922893-875c7cd392a9?q=80&w=600&auto=format&fit=crop",
    description: "A 5-step checklist to conduct a highly effective weekly review, ensuring you start every Monday with absolute clarity.",
    benefits: [
      "Eliminates Monday morning overwhelm and anxiety.",
      "Ensures critical tasks aren't forgotten during busy weeks.",
      "Creates a clear boundary between work and weekend recovery.",
      "Helps track macro-goals across the year."
    ],
    howToUse: "Block out 30 minutes every Sunday afternoon. Use this PDF guide alongside a warm beverage to brain-dump your tasks, review the past week's performance, and prioritize the Big 3 items for the vital days ahead."
  },
  {
    id: "r3",
    slug: "100-questions-before-dating",
    title: "100 Questions Before Dating",
    subtitle: "Screen for alignment",
    tag: "E-Book",
    image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=600&auto=format&fit=crop",
    description: "A curated list of deep, insightful questions to ask potential partners early on, saving you months of wasted time with incompatible people.",
    benefits: [
      "Bypasses boring small talk for meaningful conversation.",
      "Highlights red flags regarding core values and finances early.",
      "Accelerates emotional intimacy in a safe, structured way.",
      "Acts as a fantastic ice-breaker for awkward first dates."
    ],
    howToUse: "Read through the specific categories. Keep 3-4 questions in your mental back pocket for dinner dates, or literally pull out the PDF and make a fun game out of it with your partner."
  },
  {
    id: "r4",
    slug: "habit-tracker-printable",
    title: "Habit Tracker Printable",
    subtitle: "Don't break the chain",
    tag: "Template",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    description: "A minimalist, aesthetically pleasing 30-day habit tracker grid that relies on the psychological power of visual streaks.",
    benefits: [
      "Provides immediate dopamine for completing daily micro-tasks.",
      "Offers a stark, undeniable visual reality of your consistency.",
      "Simple design doesn't require complex app navigation.",
      "Easily customizable for workouts, reading, or diet."
    ],
    howToUse: "Print it out and tape it to your bathroom mirror or fridge. Pick a maximum of 3 habits. Put an 'X' in the box every single day you complete the task. Don't break the chain."
  },
  {
    id: "r5",
    slug: "goal-setting-framework",
    title: "Goal Setting Framework",
    subtitle: "The 12-week year",
    tag: "PDF Guide",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    description: "An actionable framework that condenses annual goals into urgent 12-week sprints, multiplying your execution speed.",
    benefits: [
      "Prevents the common 'November panic' when annual goals are unmet.",
      "Creates artificial urgency, entirely eliminating procrastination.",
      "Forces you to break down massive ambitions into daily levers.",
      "Makes tracking progress highly mathematical and objective."
    ],
    howToUse: "Download the framework and set up your next 12-week sprint. Define your primary goal, the specific daily actions required, and use the weekly scorecard to hold yourself ruthlessly accountable."
  },
  {
    id: "r6",
    slug: "mindfulness-basics",
    title: "Mindfulness Basics",
    subtitle: "Calm the chaos",
    tag: "E-Book",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    description: "A completely non-mystical, practical introduction to meditation and mindfulness for highly analytical overthinkers.",
    benefits: [
      "Instantly lowers baseline cortisol levels and stress.",
      "Improves the ability to separate your identity from your thoughts.",
      "Enhances deep focus when working on complex problems.",
      "Helps you fall asleep faster without a racing mind."
    ],
    howToUse: "Read the short booklet over a weekend. Follow the specific 5-minute breathing exercise detailed in Chapter 2 every morning for the next seven days to see immediate physiological results."
  },
  {
    id: "r7",
    slug: "budgeting-spreadsheet",
    title: "Budgeting Spreadsheet",
    subtitle: "Track every penny",
    tag: "Template",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    description: "An effortless Notion/Excel template that visually maps your income, fixed expenses, and guilt-free spending money.",
    benefits: [
      "Provides absolute clarity on exactly where your money goes.",
      "Highlights exactly how much you can invest or save automatically.",
      "Removes the guilt from spending money on things you love.",
      "Takes less than 15 minutes a month to maintain."
    ],
    howToUse: "Download the template, plug in your monthly take-home pay, list your fixed utility/rent costs, and the spreadsheet will automatically calculate your exact fun-money allowance."
  },
  {
    id: "r8",
    slug: "morning-routine-checklist",
    title: "Morning Routine Checklist",
    subtitle: "Win the morning",
    tag: "PDF Guide",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=600&auto=format&fit=crop",
    description: "A realistic, scalable morning routine checklist that doesn't require waking up at 4 AM or taking ice baths.",
    benefits: [
      "Builds momentum immediately after waking up.",
      "Ensures hydration, movement, and mental clarity before checking emails.",
      "Easily adaptable to 10-minute or 60-minute time frames.",
      "Reduces decision fatigue early in the day."
    ],
    howToUse: "Review the checklist. Decide if you are running the 'short' routine (15 mins) or the 'long' routine (45 mins) based on your schedule, and check off the items. Keep it by your bedside."
  },
  {
    id: "r9",
    slug: "overcoming-procrastination",
    title: "Overcoming Procrastination",
    subtitle: "The 2-minute rule",
    tag: "E-Book",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    description: "A psychological deep dive into why we avoid difficult tasks and exactly how to trick our brain into starting them.",
    benefits: [
      "Explains the connection between anxiety and avoidance.",
      "Provides tactical 'friction-reduction' strategies to guarantee task-starting.",
      "Helps you forgive yourself for past bouts of unproductivity.",
      "Defines exactly how to handle massive, overwhelming projects."
    ],
    howToUse: "Read this short guide whenever you feel hopelessly stuck on a major project. Apply the '2-minute rule' highlighted in the guide immediately upon reaching the final page to break the inertia."
  },
  {
    id: "r10",
    slug: "self-reflection-journal-prompts",
    title: "Self-Reflection Journal Prompts",
    subtitle: "Audit your life",
    tag: "Template",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    description: "A collection of 50 aggressive and uncovering journal prompts designed to force you to be brutally honest with yourself.",
    benefits: [
      "Exposes limiting beliefs you didn't know you harbored.",
      "Helps articulate vague feelings of dissatisfaction clearly.",
      "Provides phenomenal clarity on what you actually want out of life.",
      "Acts as cheaper, rapid-fire self-administered therapy."
    ],
    howToUse: "Sit down in a quiet room with a physical notebook. Do not use a laptop. Pick one prompt at random, set a timer for 10 minutes, and do not stop writing until the timer sounds."
  }
];
