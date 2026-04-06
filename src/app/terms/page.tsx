import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "April 6, 2026";
  
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-12 italic">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to <strong>ishaanlive.in</strong>. These Terms and Conditions govern your use of our website and the services provided by <strong>Ishaan Singh</strong> ("we", "us", "our"). By accessing or using our services, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Provided</h2>
            <p>
              We provide online coaching, recorded masterclasses, digital workbooks, and community access focused on life and relationship coaching.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <p>
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
            <p>
              All content provided within our masterclasses, workbooks, and website—including videos, text, and graphics—is the intellectual property of Ishaan Singh. You are granted a limited, non-exclusive license to view the content for personal use only. Redistribution or resale is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment and Fees</h2>
            <p>
              All payments are processed securely via Razorpay. By purchasing a course, you agree to provide accurate payment information. Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p>
              Our coaching services are for educational and informational purposes only. We do not provide professional medical or psychological advice. We are not liable for any personal or relationship outcomes resulting from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
            <p>
              We reserve the right to terminate your access to the platform without prior notice if you violate these terms or engage in behavior that is harmful to the community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding these Terms, please contact us at:<br />
              <strong>Email:</strong> hello@ishaanlive.in<br />
              <strong>Address:</strong> B 37 Ashoka Apartment Sector 9 Rohini, New Delhi 110085
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
