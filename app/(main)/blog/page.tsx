import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";

const prisma = new PrismaClient();

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  let dbBlogs: any[] = [];
  try {
    dbBlogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });
  } catch (err) {
    console.error("Blog query failed:", err);
  }

  const fallbackBlogs = [
    {
      id: "b1",
      title: "5 Secrets to Maintaining Your Keratin Treatment",
      slug: "secrets-maintaining-keratin-treatment",
      content: "Keratin treatments are a game-changer for anyone dealing with frizz...",
      author: "Pawan (Master Stylist)",
      image: "/gallery/salon-6.webp",
      createdAt: new Date("2026-07-01")
    },
    {
      id: "b2",
      title: "Choosing the Perfect Hair Color for South Asian Skin Tones",
      slug: "choosing-perfect-hair-color-south-asian-skin",
      content: "Hair color is one of the quickest ways to change up your style...",
      author: "Pawan (Color Expert)",
      image: "/gallery/salon-7.webp",
      createdAt: new Date("2026-07-10")
    },
    {
      id: "b3",
      title: "Essential Skin Prep Tips Before Bridal Makeup",
      slug: "essential-skin-prep-bridal-makeup",
      content: "Every bride wants to look glowing and flawless on her wedding day...",
      author: "Sita (Bridal Artist)",
      image: "/gallery/salon-8.webp",
      createdAt: new Date("2026-07-15")
    }
  ];

  const blogs = dbBlogs.length > 0 ? dbBlogs : fallbackBlogs;

  return (
    <main className="pb-24">
      <PageHeader 
        title="Beauty Journal" 
        subtitle="Insights, hair guides, and beauty rituals from our expert team."
      />
      
      <section className="px-6 md:px-16 lg:px-20 w-[92%] max-w-[1200px] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <ScrollReveal 
              key={blog.id} 
              delay={0.05 * (idx % 3)} 
              className="bg-white rounded-2xl overflow-hidden shadow-premium border border-primary-container/5 flex flex-col group h-full"
            >
              <div className="relative aspect-[16/10] bg-surface-dim overflow-hidden">
                {blog.image ? (
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                    <span className="material-symbols-outlined text-[32px]">menu_book</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[11px] text-on-surface-variant/70 font-semibold mb-2 block">
                  {new Date(blog.createdAt).toLocaleDateString()} · By {blog.author}
                </span>
                <h3 className="font-headline-md text-lg font-bold text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-on-surface-variant text-[13px] leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {blog.content}
                </p>
                <div className="pt-4 border-t border-primary-container/5 mt-auto">
                  <Link href={`/blog/${blog.slug}`} className="text-[12px] font-bold text-on-surface hover:text-primary flex items-center gap-1">
                    Read Article <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}