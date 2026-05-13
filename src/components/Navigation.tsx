"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Syringe, CalendarHeart, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Início", href: "/dashboard", icon: Home },
  { name: "Vacinas", href: "/dashboard/vacinas", icon: Syringe },
  { name: "Consultas", href: "/dashboard/consultas", icon: CalendarHeart },
  { name: "Perfil", href: "/dashboard/perfil", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Navigation (Visible on small screens) */}
      <nav className="sm:hidden fixed bottom-0 w-full bg-sus-surface border-t border-slate-200 dark:border-slate-800 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center w-full h-full text-xs font-medium"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 bg-sus-primary/10 rounded-xl m-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-6 h-6 mb-1 z-10 transition-colors ${
                    isActive ? "text-sus-primary" : "text-sus-muted"
                  }`}
                  aria-hidden="true"
                />
                <span className={`z-10 transition-colors ${isActive ? "text-sus-primary font-bold" : "text-sus-muted"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar (Visible on sm and up) */}
      <aside className="hidden sm:flex flex-col w-64 h-screen fixed left-0 top-0 bg-sus-surface border-r border-slate-200 dark:border-slate-800 z-40">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-sus-primary rounded-xl flex items-center justify-center text-white font-bold">
            SUS
          </div>
          <h2 className="text-xl font-bold text-sus-foreground tracking-tight">Meu SUS Digital</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-sus-primary/10 text-sus-primary font-bold"
                    : "text-sus-muted hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-sus-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-sus-primary rounded-r-full"
                  />
                )}
                <Icon className="w-5 h-5" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Link>
        </div>
      </aside>
    </>
  );
}
