import ChatInterface from "@/components/ChatInterface";
import Link from "next/link";

export const metadata = {
  title: "AI Life Coach | Platforms",
  description: "Chat with your AI life coach.",
};

export default function AiLifePage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Life Coach</h1>
          <p className="text-lg text-muted-foreground">
            Gain clarity, build discipline, and focus on long-term growth. Structured advice to help you get unstuck.
          </p>
        </div>
        
        {/* Toggle Switch */}
        <div className="inline-flex h-11 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground w-full md:w-auto shrink-0 border border-border/50">
          <Link 
            href="/ai-relationship" 
            className="inline-flex h-full items-center justify-center whitespace-nowrap rounded-lg px-6 text-sm font-medium transition-all hover:text-foreground hover:bg-muted/80 w-1/2 md:w-auto"
          >
            Relationship
          </Link>
          <div className="inline-flex h-full items-center justify-center whitespace-nowrap rounded-lg px-6 text-sm font-semibold transition-all bg-background text-foreground shadow-sm w-1/2 md:w-auto">
            Life Coach
          </div>
        </div>
      </div>
      
      <ChatInterface 
        type="life" 
        title="Life & Discipline Chat" 
        description="Ask me about habit formation, overcoming procrastination, or finding your path."
      />
    </div>
  );
}
