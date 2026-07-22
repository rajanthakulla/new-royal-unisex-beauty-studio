import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Concierge from "@/components/Concierge";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    console.error("Layout settings query failed:", err);
  }

  return (
    <>
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer settings={settings} />
      <Concierge settings={settings} />
    </>
  );
}
