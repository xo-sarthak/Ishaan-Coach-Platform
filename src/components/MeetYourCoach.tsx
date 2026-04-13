import React from "react";

export const MeetYourCoach = () => {
  return (
    <section className="w-full bg-card py-20 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <div className="aspect-square rounded-full overflow-hidden relative group bg-transparent">
            {/* Pure image with circular clip and hover scale */}
            <img
              src="/images/coach4.png"
              alt="Ishaan Singh - Coach"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-full"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6">
            The Visionary
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Meet Your Coach</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-medium">
            My aim is to ensure all the choices you make in life come from a point of profound awareness, not default programming or ignorance.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            I've broken down years of research, coaching, and real-world failure into scalable frameworks that you can apply immediately to see tangible results.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-[2rem] border border-border text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-black text-primary mb-1">200k+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Lives Changed</div>
            </div>
            <div className="bg-background p-6 rounded-[2rem] border border-border text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-black text-primary mb-1">200M+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Views</div>
            </div>
            <div className="bg-background p-6 rounded-[2rem] border border-border text-center shadow-sm hover:shadow-md transition-shadow hidden lg:block">
              <div className="text-3xl font-black text-primary mb-1">130K+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Community</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
