import PageHeader from "@/components/PageHeader";

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-24">
      <PageHeader title="Privacy Policy" subtitle="Your privacy is important to us." />
      
      <section className="px-margin-desktop max-w-3xl mx-auto py-20 space-y-8 bg-white my-12 p-10 shadow-premium">
        <div className="prose prose-lg max-w-none prose-headings:font-display-lg prose-headings:text-primary">
          <h2>1. Introduction</h2>
          <p>
            Welcome to New Royal Beauty & Unisex Salon. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and Services, or when you contact us. This includes:
          </p>
          <ul>
            <li>Name and Contact Data (Email, Phone number)</li>
            <li>Booking and Service History</li>
            <li>Payment Information (processed securely by third parties)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below:
          </p>
          <ul>
            <li>To facilitate booking and service delivery</li>
            <li>To send administrative information to you (appointment reminders)</li>
            <li>To send marketing and promotional communications (with your consent)</li>
            <li>To request feedback and contact you about your use of our Website</li>
          </ul>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us or contact us by phone using the details provided on our Contact page.
          </p>
        </div>
      </section>
    </main>
  );
}