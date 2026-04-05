export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  language: "English" | "Hindi";
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "Make Epic Money",
    author: "Ankur Warikoo",
    description: "The book that I wish I was given when I was young. Something that school, college, my family should have taught me but never did.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Finance",
    language: "English",
  },
  {
    id: "2",
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    description: "A book to be read, and re-read, whose lines you will underline and think about again and again. Clear the mess in your life.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Self-Help",
    language: "English",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones. Practical strategies that will teach you exactly how to master the tiny behaviors.",
    image: "https://images.unsplash.com/photo-1589998059171-98c98c1503c9?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Productivity",
    language: "English",
  },
  {
    id: "4",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave.",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Finance",
    language: "English",
  },
  {
    id: "5",
    title: "Godaan",
    author: "Munshi Premchand",
    description: "A masterpiece of Hindi literature, exploring the complex social structure and the struggles of the Indian peasantry.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Classic Literature",
    language: "Hindi",
  },
  {
    id: "6",
    title: "Rashmirathi",
    author: "Ramdhari Singh Dinkar",
    description: "An epic poem based on the life of Karna from Mahabharata. It explores themes of righteousness, bravery, and destiny.",
    image: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Epic Poetry",
    language: "Hindi",
  },
  {
    id: "7",
    title: "Gunaho Ka Devta",
    author: "Dharamvir Bharati",
    description: "One of the most popular Hindi novels, it tells a poignant story of love, idealism, and social constraints.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Romance / Drama",
    language: "Hindi",
  },
  {
    id: "8",
    title: "Madhushala",
    author: "Harivansh Rai Bachchan",
    description: "A profound collection of rubais (quatrains) that uses the tavern and wine as metaphors for life's complexities and spiritual quest.",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop",
    link: "#",
    tag: "Philosophical Poetry",
    language: "Hindi",
  }
];
