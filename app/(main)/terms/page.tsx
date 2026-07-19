import PageHeader from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <main className="pb-24">
      <PageHeader title="Terms & Conditions" subtitle="Please read these terms carefully before using our services." />
      
      <section className="px-margin-desktop max-w-3xl mx-auto py-20 space-y-8 bg-white my-12 p-10 shadow-premium">
        <div className="prose prose-lg max-w-none prose-headings:font-display-lg prose-headings:text-primary">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using our website and services at New Royal Beauty & Unisex Salon, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you do not have permission to access the service.
          </p>

          <h2>2. Appointments & Punctuality</h2>
          <p>
            We highly recommend booking appointments in advance. Please arrive at least 10 minutes prior to your scheduled appointment. Late arrivals may result in a shortened service time to ensure the next client is not delayed.
          </p>

          <h2>3. Health & Medical Conditions</h2>
          <p>
            Please inform our staff of any allergies, medical conditions, or sensitivities before your service begins. We are not liable for any adverse reactions if such conditions were not disclosed prior to the treatment.
          </p>

          <h2>4. Pricing & Payments</h2>
          <p>
            All prices are subject to change without prior notice. We accept cash, credit cards, and online mobile payments (eSewa, Khalti, Fonepay). Payment is due in full at the time of service.
          </p>

          <h2>5. Right to Refuse Service</h2>
          <p>
            We reserve the right to refuse service to anyone demonstrating inappropriate behavior, intoxication, or any condition that poses a health or safety risk to our staff or other clients.
          </p>
        </div>
      </section>
    </main>
  );
}