import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Curated fallback blogs in case the DB doesn't have them
  const fallbackBlogs: Record<string, any> = {
    "secrets-maintaining-keratin-treatment": {
      title: "5 Secrets to Maintaining Your Keratin Treatment",
      author: "Pawan (Master Stylist)",
      image: "/gallery/salon-9.webp",
      createdAt: new Date("2026-07-01"),
      content: `Keratin treatments are a game-changer for anyone dealing with frizzy, unmanageable hair. It seals the hair cuticle with a coating of protein, leaving it silky, shiny, and smooth. However, how you care for it after leaving the salon determines how long those results will last.

Here are 5 master tips to keep your keratin treatment looking fresh for up to 5 months:

1. Avoid Water & Sweat for the First 72 Hours:
This is the most critical window. The keratin is still curing on your hair structure. Do not wash your hair, go swimming, or engage in heavy workouts that cause scalp sweat. If your hair gets wet accidentally, blow-dry it immediately on low heat and pass a flat iron over it gently.

2. Switch to Sulfate-Free & Sodium Chloride-Free Shampoo:
Sulfate is a harsh surfactant that strips styling treatments from your hair cuticles. Additionally, check your shampoo for Sodium Chloride (table salt). Salt can dissolve the keratin coating, reversing the treatment's smoothing effects. Use our recommended New Royal post-keratin shampoo.

3. Limit Hair Washing Frequency:
Even with sulfate-free shampoos, washing your hair too frequently will gradually wash away the treatment. Try to wash your hair no more than 2 to 3 times a week. Switch to a lightweight dry shampoo to absorb oils in between washes.

4. Blow-Dry After Every Wash:
Keratin treatments are heat-activated. Letting your hair air-dry might result in slight frizz. Gently blow-dry your hair using a paddle brush. You'll find it dries 50% faster and drops straight with minimal styling.

5. Use a Silk or Satin Pillowcase:
Traditional cotton pillowcases create friction against your hair fibers as you toss and turn at night. This friction can damage the cuticles and cause frizz. Sleeping on silk or satin keeps your hair cuticle smooth, shiny, and frizz-free.

Book a consultation session with Pawan Sir to discover which smoothing treatment suits your hair structure best!`
    },
    "choosing-perfect-hair-color-south-asian-skin": {
      title: "Choosing the Perfect Hair Color for South Asian Skin Tones",
      author: "Pawan (Color Expert)",
      image: "/gallery/hero-main.png",
      createdAt: new Date("2026-07-10"),
      content: `Hair coloring is an art form. When done right, it brightens your complexion, highlights your facial structure, and adds instant style. For South Asian skin tones, which naturally range from warm honey to deep olive, choosing the right undertone is the key to a stunning hair transformation.

Here is a guide to selecting a hair color that complements your complexion:

1. Identify Your Skin's Undertone:
Undertones are either Warm, Cool, or Neutral. A quick test is to look at the veins on your wrist under natural light:
- Greenish veins suggest a Warm undertone.
- Blue/purple veins suggest a Cool undertone.
- If they look blue-green, you likely have a Neutral undertone.

2. Rich Caramel & Honey Highlights (For Warm Skin Tones):
If you have warm skin, colors like honey blonde, rich caramel, and soft chestnut highlights look exceptionally natural. They blend seamlessly with dark brown roots and add warmth to your skin without looking washed out. Techniques like Balayage work beautifully here.

3. Cool Mocha & Burgundy (For Cool Skin Tones):
Cooler complexions look radiant with deep mocha, cool espresso, dark burgundy, or mahogany colors. These shades contrast beautifully with your undertone, making your skin look bright and clear. Avoid warm coppers or orange-yellow blondes as they can make cool skin look sallow.

4. Copper & Auburn (For Neutral/Olive Skin Tones):
Olive skin tones look striking with coppery auburn, rich chocolate, or dark honey tones. Pawan Sir recommends dimensional highlights or a subtle ombre to give your hair movement and depth.

Ready for a brand new hair transformation? Visit New Royal Beauty Salon in New Baneshwor, Kathmandu for a personalized hair consultation!`
    },
    "essential-skin-prep-bridal-makeup": {
      title: "Essential Skin Prep Tips Before Bridal Makeup",
      author: "Sita (Bridal Artist)",
      image: "/gallery/salon-1.webp",
      createdAt: new Date("2026-07-15"),
      content: `A flawless bridal look starts long before the makeup brush touches your skin. As makeup artists, we always say: your skin is the canvas, and makeup is the paint. The smoother, healthier, and more hydrated your canvas is, the more luminous and long-lasting your bridal makeup will be.

Here are the essential skin preparation steps you should follow leading up to your wedding day:

1. Start a Consistent Skincare Routine 3 Months Prior:
Don't wait until the week before your wedding to try new products. Start a simple, consistent routine: Double cleanse, hydrate, moisturize, and apply SPF daily. Focus on products containing hyaluronic acid, vitamin C, and gentle chemical exfoliants (like lactic acid) to brighten your skin structure.

2. Never Try a New Facial Within 10 Days of the Wedding:
Facials can purge impurities from your skin, occasionally leading to temporary breakouts or redness. Schedule your final deep-cleansing facial at least 10 to 14 days before your wedding. At New Royal, we offer specialized pre-bridal glow treatments scheduled perfectly for your wedding timeline.

3. Hydrate Inside and Out:
Dehydrated skin can absorb the moisture from your foundation, leaving it looking cakey or dry. Drink at least 3 liters of water daily, limit high-sodium foods, and use a hydrating sheet mask twice a week.

4. Gently Exfoliate & Dermaplane:
To ensure your foundation blends seamlessly, gentle exfoliation is key to removing dead skin flakes. Dermaplaning (shaving peach fuzz) is also highly popular for brides, as it creates an incredibly smooth surface for airbrush makeup.

5. Don't Forget Eye & Lip Care:
Lash extensions, heavy eye makeup, and matte lipsticks require hydrated bases. Apply an ultra-nourishing eye cream and use a lip scrub followed by a rich lip balm nightly.

Book our Premium Royal Bridal Package at New Royal Beauty Salon and let our certified artists guide you through your personalized pre-wedding beauty prep!`
    }
  };

  let blog = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!blog && fallbackBlogs[slug]) {
    blog = fallbackBlogs[slug];
  }

  if (!blog) {
    notFound();
  }

  return (
    <main className="pb-24">
      <PageHeader 
        title={blog.title} 
        subtitle={`Written by ${blog.author} on ${new Date(blog.createdAt).toLocaleDateString()}`}
      />

      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[800px] mx-auto py-16 space-y-10">
        
        {/* Blog Image */}
        <ScrollReveal delay={0.1} className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-premium border border-primary-container/5 bg-surface-dim">
          {blog.image ? (
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
              <span className="material-symbols-outlined text-[64px]">menu_book</span>
            </div>
          )}
        </ScrollReveal>

        {/* Back Link */}
        <ScrollReveal delay={0.15} className="flex justify-between items-center text-sm text-on-surface-variant">
          <Link href="/blog" className="flex items-center gap-1 hover:text-primary font-bold transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Journal
          </Link>
          <span>Read Time: ~3 mins</span>
        </ScrollReveal>

        <div className="h-[1px] bg-primary-container/10"></div>

        {/* Blog Content body */}
        <ScrollReveal delay={0.2} className="prose prose-stone max-w-none text-on-surface leading-relaxed font-body-md text-[15px] whitespace-pre-line space-y-6">
          {blog.content}
        </ScrollReveal>

        <div className="pt-8 border-t border-primary-container/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center font-bold text-sm rounded-full shrink-0">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-on-surface text-sm leading-tight">{blog.author}</p>
              <p className="text-[12px] text-on-surface-variant">Master Aesthetician & Stylist</p>
            </div>
          </div>

          <Link href="/book">
            <button className="py-3 px-8 bg-on-surface hover:bg-primary text-white font-label-md text-[12px] uppercase tracking-widest rounded-full transition-colors active:scale-95 shadow-md">
              Book Appointment
            </button>
          </Link>
        </div>

      </section>
    </main>
  );
}