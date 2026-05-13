"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Syringe, Calendar } from "lucide-react";

export default function VacinasPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Carteira de Vacinação</h1>
        <p className="text-sus-muted text-lg mt-1">Histórico completo de imunizações.</p>
      </header>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl">
                <Syringe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Vacina contra COVID-19 (Bivalente)</h3>
                <div className="flex items-center gap-2 text-sm text-sus-muted mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Dose {i} • 15/10/2023</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="px-3 py-1 bg-emerald-600 text-white shadow-sm text-xs font-bold rounded-full">Aplicada</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
