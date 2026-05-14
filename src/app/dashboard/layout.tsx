import { Navigation } from "@/components/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sus-background pt-16 sm:pt-0 pb-16 sm:pb-0 sm:pl-64 transition-colors duration-500">
      <Navigation />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
