export default function RefundPolicyPage() {
  const lastUpdated = "April 6, 2026";
  
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
        <p className="text-muted-foreground mb-12 italic">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Refund Policy</h2>
            <p>
              Due to the nature of our digital products (online coaching, masterclasses, and digital workbooks), we maintain a strict <strong>No Refund Policy</strong>. All sales of our digital content and coaching services are final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Why No Refunds?</h2>
            <p>
              When you purchase a masterclass or a coaching session, you receive immediate access to our proprietary content, intellectual property, and digital materials. Because this content is delivered instantly, it cannot be "returned" in the traditional sense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Exceptional Circumstances</h2>
            <p>
              While we maintain a strict no-refund policy, we strive for full customer satisfaction. If you encounter technical issues that prevent you from accessing the content, please contact our support team, and we will work to resolve the issue promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Dispute Resolution</h2>
            <p>
              We encourage you to contact <strong>hello@ishaanlive.in</strong> first to resolve any concerns before initiating a dispute through your bank or payment gateway. We value our students and are committed to a fair and transparent experience.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding our Refund Policy, please contact us at:<br />
              <strong>Email:</strong> help@ishaanlive.in<br />
              <strong>Address:</strong> B 37 Ashoka Apartment Sector 9 Rohini, New Delhi 110085
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
