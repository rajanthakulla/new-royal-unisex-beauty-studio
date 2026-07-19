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
  const settings = await prisma.siteSettings.findFirst();

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
