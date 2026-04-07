export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  isPopular?: boolean;
  features: { name: string; included: boolean }[];
}

export interface Review {
  name: string;
  text: string;
}

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  rating: string;
  enrollmentCount: string;
  duration: string;
  problems: string[];
  description: string;
  curriculum: { module: string; description: string }[];
  testimonials: Review[];
  pricing: PricingPlan[];
  faqs: { question: string; answer: string }[];
  vimeoId?: string;
  videoUrl?: string;
}

const DEFAULT_PRICING: PricingPlan[] = [
  // {
  //   id: "basic",
  //   name: "Basic Video Plan",
  //   subtitle: "Essential Access",
  //   price: "₹899",
  //   features: [
  //     { name: "Pre-recorded Video Lectures", included: true },
  //     { name: "Downloadable PDF Course Notes", included: true },
  //     { name: "Certificate of Completion", included: true },
  //     { name: "Refund Guarantee", included: true },
  //     { name: "Monthly Live Group Q&A Sessions", included: false },
  //     { name: "Assignment & Evaluation Guide", included: false },
  //     { name: "Course Virtual Community", included: false },
  //   ],
  // },
  {
    id: "standard",
    name: "Standard Learning Plan",
    subtitle: "Complete Access",
    price: "₹1,299",
    isPopular: true,
    features: [
      { name: "Pre-recorded Video Lectures", included: true },
      { name: "Downloadable PDF Course Notes", included: true },
      { name: "Certificate of Completion", included: true },
      { name: "Refund Guarantee", included: true },
      { name: "Monthly Live Group Q&A Sessions", included: true },
      { name: "Assignment & Evaluation Guide", included: true },
      { name: "Course Virtual Community", included: false },
    ],
  },
  // {
  //   id: "premium",
  //   name: "Premium Advantage Plan",
  //   subtitle: "Community & Mentorship",
  //   price: "₹1,499",
  //   features: [
  //     { name: "Pre-recorded Video Lectures", included: true },
  //     { name: "Downloadable PDF Course Notes", included: true },
  //     { name: "Certificate of Completion", included: true },
  //     { name: "Refund Guarantee", included: true },
  //     { name: "Monthly Live Group Q&A Sessions", included: true },
  //     { name: "Assignment & Evaluation Guide", included: true },
  //     { name: "Course Virtual Community", included: true },
  //   ],
  // },
];

const DEFAULT_FAQS = [
  { question: "How long will it take to get access to the course?", answer: "Your credentials will be delivered to your inbox within 5-10 minutes of your purchase." },
  { question: "What is the time commitment required?", answer: "The course is self-paced and will require 5+ hours. If you have the Premium version, you’ll also have access to bonus content and monthly live Q&A." },
  { question: "Which language is the course in?", answer: "The course is available in English with subtitles." },
  { question: "Does the course come with any live interaction?", answer: "Yes, the premium version of this course consists of monthly live group Q&A sessions." },
  { question: "Can I cancel my course purchase and get a refund if I don't like it?", answer: "Yes, you can cancel your course anytime within 14 days of purchase and get a full refund, no questions asked." }
];

export const COURSES: CourseData[] = [
  {
    id: "c0",
    slug: "ek-taraf-ka-love",
    title: "Ek Taraf Ka Love",
    subtitle: "Masterclass by Ishaan Singh",
    tag: "Masterclass",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    rating: "4.9",
    enrollmentCount: "1,200+",
    duration: "90 Minutes",
    description: "Jab sirf tum dete ho… aur partner lena bhool jaata hai. 90 minutes that can change everything. In Hindi.",
    vimeoId: "76979871",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    problems: [
      "Jab sirf tum dete ho… aur partner lena bhool jaata hai.",
      "Mujhe lagta tha ki main hi zyada sochti hoon, zyada feel karti hoon.",
      "Mujhe darr tha ki agar maine apni baat ki toh woh chhod degi.",
      "Ek rishta jo tumhe andar se toota hua feel kara raha hai.",
      "Aksar humari tendencies baar-baar repeat hoti hain."
    ],
    curriculum: [
      { module: "Module 1", description: "Iska jawab tumhare childhood mein hai, tumhari attachment style mein hai. Samajhoge toh sab clear ho jaayega — bina khud ko blame kiye." },
      { module: "Module 2", description: "Exact words seekhoge — partner se kaise baat karein, bina lad ke, bina toote. Woh conversation jo tum mahino se avoid kar rahe ho." },
      { module: "Module 3", description: "Pyar mein khud ko mitaana zaroori nahin. Boundaries kaise set karein, apni value kaise jagaayein — rishte ko tod ke nahin, build karke." },
      { module: "Module 4", description: "Sabse important aur sabse mushkil sawaal. Clarity milegi — bina guilt ke, bina darr ke. Yeh sirf tum decide karoge, lekin informed hokar." }
    ],
    testimonials: [
      { name: "Student 1", text: "Mujhe lagta tha ki main hi zyada sochti hoon, zyada feel karti hoon. Ishaan ne pehli baar explain kiya ki yeh weakness nahin — yeh mera caring nature hai. Aur iska fayda uthane dena band karna hai. 3 saal ki frustration ek session mein clear ho gayi." },
      { name: "Student 2", text: "Mujhe darr tha ki agar maine apni baat ki toh woh chhod degi. Ishaan ne jo conversation ka structure diya — woh actually kaam kiya. Pehli baar meri girlfriend ne mujhe suna. Pehli baar hum actually baat kar paaye." },
      { name: "Student 3", text: "2 saal mein pehli baar mujhe clarity mili — chhodni chahiye ya nahin. Ishaan ne judge nahin kiya. Sirf sach bataaya. Aur woh sach sun ne ki mujhe bahut zaroorat thi. Iss masterclass ne meri life badal di — literally." }
    ],
    pricing: [
      {
        id: "masterclass",
        name: "Masterclass Entry",
        subtitle: "Full Access",
        price: "₹999",
        features: [
          { name: "90-minute recorded Video masterclass", included: true },
          { name: "Full recording access — life time ke liye", included: true },
          { name: "PDF workbook + conversation scripts download", included: true },
          { name: "Private Q&A session during the live class", included: true },
          { name: "Community access — same-story logon se connect karo", included: true },
          { name: "100% Money-back guarantee", included: true },
          { name: "Monthly Live Group Q&A Sessions", included: false }
        ]
      }
    ],
    faqs: [
      { question: "Registration ke baad kya hoga?", answer: "Registration ke baad tumhe email aur WhatsApp par exact date, time aur Video link milega. Hum dates regularly schedule karte hain — toh tumhara slot jaldi confirm ho jaata hai. Recording bhi milegi toh koi miss nahin hoga." },
      { question: "Agar live class miss ho gayi toh?", answer: "Koi tension nahin! Registration ke baad tumhe full recording milegi — jab chaaho dekh sako. Content ka ek bhi word miss nahin hoga. Recording lifetime ke liye tumhare paas rahegi." },
      { question: "Kya yeh sirf couples ke liye hai?", answer: "Bilkul nahin! Yeh masterclass har us insaan ke liye hai jo ek taraf ka love ka pattern samajhna chahta/chahti hai — chahe relationship mein ho, chahe dating mein ho, chahe simply apni patterns ko understand karna ho." },
      { question: "Kya partner ko aana zaroori hai?", answer: "Haan, zaroor! Agar tumhara partner bhi attend karna chahta/chahti hai, toh unke liye alag registration karni hogi. Lekin yeh masterclass khaas taur pe un logon ke liye design ki gayi hai jo feel karte hain ki sirf wahi dete hain — toh akele bhi aa sakte ho." },
      { question: "Agar masterclass pasand na aayi toh?", answer: "Main samajh sakta hoon. Lekin socho — ek rishta jo tumhe andar se toota hua feel kara raha hai, woh tumhari energy, health aur happiness le raha hai. ₹999 ek coffee machine se bhi sasta hai. Aur agar yeh kaam nahin kiya, hum 100% refund denge. Toh actually risk koi nahin hai. ❤️" }
    ]
  }
  // {
  //   id: "c1",
  //   slug: "the-clarity-framework",
  //   title: "The Clarity Framework",
  //   subtitle: "Most Popular",
  //   tag: "Video Course",
  //   image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.88",
  //   enrollmentCount: "44,596+",
  //   duration: "6+ Hours",
  //   description: "A complete framework on finding your purpose, setting goals, and waking up with extreme intention every single day.",
  //   problems: [
  //     "Waking up anxious or confused",
  //     "Procrastinating on big decisions",
  //     "Feeling lost in your career track",
  //     "Struggling to commit to a path",
  //     "Overwhelmed by too many options"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: Diagnosing the Noise", description: "Learn how to identify the external factors dictating your life choices." },
  //     { module: "Module 2: The Core Values Audit", description: "A system to zero-in on what actually matters to you." },
  //     { module: "Module 3: Strategic Planning", description: "How to translate values into 1-year, 3-year, and 10-year roadmaps." },
  //     { module: "Module 4: Daily Execution", description: "Building daily micro-habits that align perfectly with your macro goals." }
  //   ],
  //   testimonials: [
  //     { name: "Aishwarya R.", text: "It was one of the best educational resources I’ve found. The course simplified complex concepts into actionable steps." },
  //     { name: "Mayank K.", text: "Everyone talks about clarity, but no one gives you a framework. This course gave me a framework to measure my exact progress." },
  //     { name: "Sneha A.", text: "Highly recommend this course. I was feeling stuck in my 30s and this gave me an entirely new perspective on my life's direction." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c2",
  //   slug: "dating-with-intention",
  //   title: "Dating with Intention",
  //   subtitle: "Navigate modern romance",
  //   tag: "Masterclass",
  //   image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.92",
  //   enrollmentCount: "21,340+",
  //   duration: "4.5 Hours",
  //   description: "Learn how to communicate your needs clearly, avoid toxic patterns, and build a relationship based on respect and authenticity.",
  //   problems: [
  //     "Attracting the wrong partners",
  //     "Fear of vulnerability and rejection",
  //     "Consistent communication breakdowns",
  //     "Texting anxiety and game-playing",
  //     "Not knowing your relationship needs"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: The Modern Landscape", description: "Understanding the psychology behind dating apps and modern selection." },
  //     { module: "Module 2: Red Flags & Boundaries", description: "How to assert boundaries early without being aggressive." },
  //     { module: "Module 3: High-Value Communication", description: "Texting and talking with absolute clarity and intention." },
  //     { module: "Module 4: Building Long-Term Trust", description: "Transitioning from early dating to committed partnership seamlessly." }
  //   ],
  //   testimonials: [
  //     { name: "David M.", text: "This course stopped me from repeating the same relationship mistakes I've made for the last 5 years." },
  //     { name: "Sarah J.", text: "An absolute game-changer. The communication module alone was worth 10x the price of the basic plan." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c3",
  //   slug: "building-daily-discipline",
  //   title: "Building Daily Discipline",
  //   subtitle: "Destroy procrastination",
  //   tag: "Workshop",
  //   image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.85",
  //   enrollmentCount: "35,102+",
  //   duration: "5 Hours",
  //   description: "Learn how to focus deeply in a distracted world. A masterclass on time-blocking, habit loops, and conquering your inner resistance.",
  //   problems: [
  //     "Endless doom-scrolling",
  //     "Starting projects but never finishing",
  //     "Lack of energy in the afternoon",
  //     "Feeling guilty about wasted days",
  //     "Relying entirely on fickle motivation"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: The Neuroscience of Focus", description: "Why we get distracted and how dopamine drives our behavior." },
  //     { module: "Module 2: Environment Design", description: "Organizing your physical and digital space for effortless deep work." },
  //     { module: "Module 3: Time-blocking Templates", description: "Exact scheduling methods used by top performers." },
  //     { module: "Module 4: Recovering from Failure", description: "How to bounce back immediately when you break your streak." }
  //   ],
  //   testimonials: [
  //     { name: "John D.", text: "I've read Atomic Habits, but this course actually forced me to implement the systems. The difference is night and day." },
  //     { name: "Emily Chen", text: "Productivity used to mean stress to me. Now it just feels like flowing through my daily checklist. Thank you!" }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c4",
  //   slug: "the-art-of-conversing",
  //   title: "The Art of Conversing",
  //   subtitle: "Speak with power",
  //   tag: "Bootcamp",
  //   image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.79",
  //   enrollmentCount: "18,432+",
  //   duration: "4 Hours",
  //   description: "Master small talk, deep conversation, and persuasive speech. Perfect for introverts trying to navigate professional and social environments.",
  //   problems: [
  //     "Awkward silences in meetings",
  //     "Not knowing how to approach people",
  //     "Feeling ignored in group settings",
  //     "Forgetting names instantly",
  //     "Struggle to express complex ideas"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: Breaking the Ice", description: "Simple formulas to start conversations with absolute strangers." },
  //     { module: "Module 2: Active Listening", description: "How to become the most interesting person in the room by just listening." },
  //     { module: "Module 3: Vocal Tonality", description: "Projecting confidence and authority through your voice." }
  //   ],
  //   testimonials: [
  //     { name: "Mark S.", text: "As a chronic introvert, this was exactly what I needed. Practical tools without trying to change who I am." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c5",
  //   slug: "confidence-unlocked",
  //   title: "Confidence Unlocked",
  //   subtitle: "Believe in your worth",
  //   tag: "Video Course",
  //   image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.95",
  //   enrollmentCount: "50,230+",
  //   duration: "7 Hours",
  //   description: "A comprehensive guide to overcoming imposter syndrome, asserting your value, and stepping into your power in every aspect of life.",
  //   problems: [
  //     "Severe imposter syndrome",
  //     "Fear of public speaking",
  //     "Constantly apologizing for existing",
  //     "Second-guessing your own intuition",
  //     "Seeking validation from wrong sources"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: The Roots of Insecurity", description: "Identifying core beliefs holding you back." },
  //     { module: "Module 2: The Alter-Ego Effect", description: "Using psychological constructs to summon courage." },
  //     { module: "Module 3: Assertiveness Training", description: "How to say NO clearly and kindly." }
  //   ],
  //   testimonials: [
  //     { name: "Samantha P.", text: "I finally asked for that promotion and got it. This course paid for itself 100x over." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c6",
  //   slug: "mastering-emotional-intelligence",
  //   title: "Mastering Emotional Intelligence",
  //   subtitle: "Navigate conflict",
  //   tag: "Masterclass",
  //   image: "https://images.unsplash.com/photo-1542435503-956c22bd45bc?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.89",
  //   enrollmentCount: "12,980+",
  //   duration: "5.5 Hours",
  //   description: "A deep dive into emotional regulation. Learn how to respond instead of react when triggered by stress or interpersonal conflict.",
  //   problems: [
  //     "Losing temper quickly",
  //     "Shutting down during arguments",
  //     "Absorbing other people's negative moods",
  //     "Inability to read the room",
  //     "Feeling emotionally exhausted"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: Self-Awareness", description: "Mapping your emotional triggers." },
  //     { module: "Module 2: Emotional Regulation", description: "Techniques to calm the nervous system instantly." },
  //     { module: "Module 3: Empathy & Connection", description: "Understanding others' emotional landscapes." }
  //   ],
  //   testimonials: [
  //     { name: "Brian L.", text: "My relationship with my spouse has completely changed. I listen better and react calmly. Incredible." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c7",
  //   slug: "financial-independence-101",
  //   title: "Financial Independence 101",
  //   subtitle: "Manage, Save, Invest",
  //   tag: "Workshop",
  //   image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.91",
  //   enrollmentCount: "88,400+",
  //   duration: "8+ Hours",
  //   description: "Take charge of your finances with our personal finance course. Learn budgeting, saving, investing & smart money habits.",
  //   problems: [
  //     "Drowning in EMIs and Credit Card debt",
  //     "Idea of investing confuses you",
  //     "Struggle to stick to a budget",
  //     "No emergency fund or retirement plan",
  //     "Feeling anxious about unexpected bills"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: Understanding Money", description: "Identify common money mistakes and how to avoid them." },
  //     { module: "Module 2: Debt Annihilation", description: "A mathematical framework to crush your loans." },
  //     { module: "Module 3: The Investment Engine", description: "Simple index fund strategies that beat active traders." },
  //     { module: "Module 4: Protection & Insurance", description: "Term life, health insurance, and protecting your wealth." }
  //   ],
  //   testimonials: [
  //     { name: "Abhishek K.", text: "This course has empowered me to make informed decisions with confidence regarding my financial future." },
  //     { name: "Joshua B.", text: "The course simplified complex concepts into actionable steps. I now feel in control of my finances." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c8",
  //   slug: "healing-from-breakups",
  //   title: "Healing from Breakups",
  //   subtitle: "Find yourself again",
  //   tag: "Bootcamp",
  //   image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.86",
  //   enrollmentCount: "31,200+",
  //   duration: "4.5 Hours",
  //   description: "An actionable blueprint to detach, heal, and find your identity again after a devastating end to a relationship.",
  //   problems: [
  //     "Obsessive thoughts about your ex",
  //     "Inability to let go of the past",
  //     "Loss of personal identity",
  //     "Fear of being alone forever",
  //     "Stalking social media profiles"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: No Contact Protocol", description: "Why cutting contact is the biological key to moving on." },
  //     { module: "Module 2: Grieving Intelligently", description: "How to process the pain without wallowing in it." },
  //     { module: "Module 3: Rebuilding Identity", description: "Discovering what you love outside of the partnership." }
  //   ],
  //   testimonials: [
  //     { name: "Claire F.", text: "This literally pulled me out of the darkest months of my life. Thank you for this guidance." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c9",
  //   slug: "the-philosophy-of-success",
  //   title: "The Philosophy of Success",
  //   subtitle: "Stoic strategies",
  //   tag: "Video Course",
  //   image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.80",
  //   enrollmentCount: "9,500+",
  //   duration: "6 Hours",
  //   description: "Borrowing from Stoicism and ancient philosophy to build a resilient mind capable of weathering modern chaos.",
  //   problems: [
  //     "Overreacting to things out of your control",
  //     "Constantly complaining about fairness",
  //     "Pessimistic outlook on the future",
  //     "Easily disturbed by others' opinions",
  //     "Lack of core philosophical anchoring"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: The Dichotomy of Control", description: "Separating what you can act on from what you cannot." },
  //     { module: "Module 2: Amor Fati", description: "Learning to love the obstacles in your path." },
  //     { module: "Module 3: Momento Mori", description: "Using mortality as a tool for extreme focus and gratitude." }
  //   ],
  //   testimonials: [
  //     { name: "Marcus T.", text: "A fresh perspective. I feel untouchable by office politics now." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // },
  // {
  //   id: "c10",
  //   slug: "navigating-career-transitions",
  //   title: "Navigating Career Transitions",
  //   subtitle: "Pivot successfully",
  //   tag: "Masterclass",
  //   image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
  //   rating: "4.82",
  //   enrollmentCount: "14,900+",
  //   duration: "5 Hours",
  //   description: "How to change industries, negotiate higher salaries, and re-brand your skills for an entirely new job market.",
  //   problems: [
  //     "Feeling trapped in a dead-end job",
  //     "Fear of starting over from scratch",
  //     "Resume doesn't reflect your actual skills",
  //     "Bombing interviews for lack of confidence",
  //     "Don't know how to network effectively"
  //   ],
  //   curriculum: [
  //     { module: "Module 1: Professional Auditing", description: "Identifying your highly transferable meta-skills." },
  //     { module: "Module 2: The Targeted Network", description: "How to reach hiring managers directly without applying online." },
  //     { module: "Module 3: The Interview Masterclass", description: "Controlling the narrative during the interview process." }
  //   ],
  //   testimonials: [
  //     { name: "Chloe M.", text: "Transitioned from Marketing to Tech Sales in 3 months using these exact frameworks." }
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   pricing: DEFAULT_PRICING,
  //   faqs: DEFAULT_FAQS
  // }
];
