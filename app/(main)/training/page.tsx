import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function TrainingPage() {
  const courses = [
    {
      title: "Master Diploma in Cosmetology",
      duration: "6 Months",
      desc: "A comprehensive course covering advanced hair cutting, coloring, skincare, and professional bridal makeup.",
      modules: ["Hair Anatomy & Styling", "Advanced Color Theory", "Skin Analysis & Treatment", "Airbrush Bridal Makeup", "Salon Management"]
    },
    {
      title: "Advanced Hair Styling & Chemical Work",
      duration: "3 Months",
      desc: "Specialized training in keratin, nanoplastia, rebonding, and complex coloring techniques like balayage.",
      modules: ["Keratin & Nanoplastia", "Balayage & Ombre", "Precision Cutting", "Chemical Safety", "Client Consultation"]
    },
    {
      title: "Professional Makeup Artistry",
      duration: "2 Months",
      desc: "Intensive training focusing purely on makeup for bridals, fashion shows, and everyday wear.",
      modules: ["Skin Prep & Priming", "Contouring & Highlighting", "Eye Makeup Techniques", "Saree Draping", "Portfolio Building"]
    }
  ];

  return (
    <main className="pb-24">
      <PageHeader 
        title="Royal Academy" 
        subtitle="Start your career in the beauty industry with our certified training programs."
      />
      
      <section className="px-margin-desktop max-w-5xl mx-auto py-20 space-y-16">
        <ScrollReveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-display-lg text-3xl text-on-surface mb-6">Learn from the Masters</h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
            Our academy provides hands-on, practical training using international products and techniques. Whether you are a beginner looking to start a career or a professional wanting to upgrade your skills, our tailored courses are designed to make you industry-ready.
          </p>
          <div className="flex gap-4 justify-center">
            <span className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-sm text-sm">100% Practical Training</span>
            <span className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-sm text-sm">Govt. Certified</span>
            <span className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-sm text-sm">Placement Assistance</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {courses.map((course, i) => (
            <ScrollReveal key={i} delay={0.1 * i} className="bg-white p-8 shadow-premium border-t-4 border-primary hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
              <span className="font-bold text-primary mb-2 block">{course.duration}</span>
              <h3 className="font-headline-md text-xl text-on-surface mb-4">{course.title}</h3>
              <p className="font-body-md text-on-surface-variant mb-6 flex-grow">{course.desc}</p>
              
              <div className="mb-8">
                <p className="font-bold text-on-surface text-sm mb-3 uppercase tracking-widest">Key Modules:</p>
                <ul className="space-y-2">
                  {course.modules.map((mod, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/contact" className="w-full">
                <button className="w-full py-4 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors font-label-md uppercase tracking-widest">
                  Enquire Now
                </button>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
