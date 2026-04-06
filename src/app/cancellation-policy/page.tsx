export default function CancellationPolicyPage() {
  const lastUpdated = "April 6, 2026";
  
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Cancellation Policy</h1>
        <p className="text-muted-foreground mb-12 italic">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Cancellation Policy</h2>
            <p>
              Once a purchase is made on <strong>ishaanlive.in</strong> for a digital product (masterclass, coaching session, or workbook), it is considered final. We maintain a strict <strong>No Cancellation Policy</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Why No Cancellations?</h2>
            <p>
              Cancellations are not accepted because our digital content is delivered instantly upon successful payment. Once the content has been accessed or made available to you, the value of the service has been delivered, making cancellation impossible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Exceptional Circumstances</h2>
            <p>
              In extreme cases where a student has double-paid for the same course due to a technical error, we will manually process a cancellation and refund for the duplicate payment. Please contact our support team at <strong>hello@ishaanlive.in</strong> for such inquiries.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding our Cancellation Policy, please contact us at:<br />
              <strong>Email:</strong> help@ishaanlive.in<br />
              <strong>Address:</strong> B 37 Ashoka Apartment Sector 9 Rohini, New Delhi 110085
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
