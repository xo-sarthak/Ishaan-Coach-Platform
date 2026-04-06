export default function PrivacyPage() {
  const lastUpdated = "April 6, 2026";
  
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12 italic">Last Updated: {lastUpdated}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Commitment to Privacy</h2>
            <p>
              We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy describes how we collect, use, and process your data when you visit <strong>ishaanlive.in</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Collection of Information</h2>
            <p>
              We collect information that you provide to us directly, such as your name, email address, and account credentials when you register on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Payment Information</h2>
            <p>
              All payments are processed through <strong>Razorpay</strong>. We do not store your credit card or bank details on our servers. Razorpay processes your payment information in accordance with their own privacy policy and security standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Use of Data</h2>
            <p>
              We use the collected data to provide our coaching services, process your transactions, communicate with you regarding your account or purchases, and send you information about our offerings—only if you have opted to receive them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Services</h2>
            <p>
              We use <strong>Supabase</strong> for authentication and database management. Your data is stored securely on their servers. We do not sell or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies and Tracking</h2>
            <p>
              We may use cookies to improve your user experience and for analytical purposes. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your digital identity. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to Privacy Policy</h2>
            <p>
              We reserve the right to update this policy from time to time. We will notify you of any significant changes via the email associated with your account or through a notice on our website.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding your privacy or data, please contact us at:<br />
              <strong>Email:</strong> help@ishaanlive.in<br />
              <strong>Address:</strong> B 37 Ashoka Apartment Sector 9 Rohini, New Delhi 110085
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
