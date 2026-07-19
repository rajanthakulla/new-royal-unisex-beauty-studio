const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'gallery', title: 'Gallery' },
  { path: 'team', title: 'Our Team' },
  { path: 'book', title: 'Book Appointment' },
  { path: 'academy', title: 'Training Academy' },
  { path: 'offers', title: 'Offers & Packages' },
  { path: 'contact', title: 'Contact Us' },
  { path: 'blog', title: 'Blog' },
  { path: 'faq', title: 'Frequently Asked Questions' },
  { path: 'privacy', title: 'Privacy Policy' },
  { path: 'terms', title: 'Terms & Conditions' },
  { path: 'cancellation', title: 'Cancellation & Refund Policy' },
  { path: 'services/[slug]', title: 'Service Details' },
  { path: 'blog/[slug]', title: 'Blog Post' }
];

const basePath = path.join(__dirname, 'app', '(main)');

routes.forEach(route => {
  const dirPath = path.join(basePath, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    const isDynamic = route.path.includes('[slug]');
    
    let content = '';
    if (isDynamic) {
      content = `export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-headline-lg text-primary mb-8 capitalize">{resolvedParams.slug.replace(/-/g, ' ')} - ${route.title}</h1>
      <div className="prose prose-lg max-w-none text-on-surface">
        <p>Dynamic content for {resolvedParams.slug} will be loaded here from the database.</p>
      </div>
    </main>
  );
}`;
    } else {
      content = `export default function ${route.path.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-display-lg text-display-md text-primary mb-6">${route.title}</h1>
        <div className="w-24 h-1 bg-gold-shimmer mx-auto rounded-full"></div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/20">
        <p className="text-on-surface-variant text-center text-lg">
          This page is currently under construction. Check back soon!
        </p>
      </div>
    </main>
  );
}`;
    }

    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
});
