"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Scissors, 
  CalendarCheck, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Users,
  LogOut,
  Menu,
  X,
  Settings,
  Sparkles
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Services", href: "/admin/services", icon: Scissors },
    { name: "Offers", href: "/admin/offers", icon: Tag },
    { name: "Specials", href: "/admin/specials", icon: Sparkles },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-outline-variant/30 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-outline-variant/30">
            <Link href="/admin" className="font-headline-md text-primary font-bold">
              NRB Admin
            </Link>
            <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-on-surface-variant" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-outline-variant/30 space-y-2">
            <Link 
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              <LayoutDashboard size={18} />
              Back to Website
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-error hover:bg-error-container/50 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-outline-variant/30 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-highest rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-medium text-on-surface-variant">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
