import PageHeader from "@/components/PageHeader";

export default function RefundPolicyPage() {
  return (
    <main className="pb-24">
      <PageHeader title="Cancellation & Refund" subtitle="Our policy on appointment changes and service refunds." />
      
      <section className="px-margin-desktop max-w-3xl mx-auto py-20 space-y-8 bg-white my-12 p-10 shadow-premium">
        <div className="prose prose-lg max-w-none prose-headings:font-display-lg prose-headings:text-primary">
          <h2>1. Appointment Cancellations</h2>
          <p>
            Your appointments are very important to the team at New Royal Beauty & Unisex Salon. We understand that sometimes schedule adjustments are necessary; therefore, we respectfully request at least 24 hours notice for cancellations.
          </p>
          <p>
            Please understand that when you forget or cancel your appointment without giving enough notice, we miss the opportunity to fill that appointment time, and clients on our waiting list miss the opportunity to receive services.
          </p>

          <h2>2. Late Cancellations & No-Shows</h2>
          <p>
            Cancellations made less than 24 hours in advance may be subject to a cancellation fee. No-shows will be charged 50% of the reserved service amount before a new appointment can be booked.
          </p>

          <h2>3. Service Refunds</h2>
          <p>
            We pride ourselves on providing exceptional service. If you are dissatisfied with your service, please let us know within 48 hours. While we do not offer refunds on services rendered, we will gladly invite you back for a complimentary correction or adjustment within 7 days of the original appointment.
          </p>

          <h2>4. Product Refunds</h2>
          <p>
            Unopened retail products may be exchanged within 14 days of purchase. We do not offer cash refunds for returned products; however, salon credit will be provided. Used or opened products are non-refundable and non-exchangeable due to hygiene reasons.
          </p>
        </div>
      </section>
    </main>
  );
}
