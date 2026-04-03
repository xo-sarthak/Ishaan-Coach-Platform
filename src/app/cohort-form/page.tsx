export const metadata = {
  title: "Onboarding Questionnaire | Resilience Cohort",
};

export default function CohortFormPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to the Cohort</h1>
        <p className="text-lg text-muted-foreground">
          Please complete your registration below so we can tailor the experience to your goals.
        </p>
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border inline-block text-sm text-foreground/80">
          <span className="font-medium text-foreground">Important:</span> Only fill this out if you have successfully completed the <a href="https://example.com/payment" className="underline">payment process</a>.
        </div>
      </div>

      <div className="w-full aspect-[4/5] sm:aspect-video rounded-xl overflow-hidden border border-border shadow-sm bg-muted flex items-center justify-center relative">
        {/* Placeholder for iframe / Google Form */}
        <div className="text-center p-6">
          <p className="font-medium text-muted-foreground mb-2">[Google Form / Typeform Embed Placeholder]</p>
          <a href="https://forms.gle/8ZQcapCmwB8JgWct5" target="_blank" rel="noopener noreferrer" className="text-sm underline text-primary">Open external form link</a>
        </div>
      </div>
    </div>
  );
}
