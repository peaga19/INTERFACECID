"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Pill, Info } from "lucide-react";

export default function MedicamentosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Meus Medicamentos</h1>
        <p className="text-sus-muted text-lg mt-1">Receitas e dispensação da Farmácia Popular.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card className="border-t-4 border-t-emerald-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl inline-block border border-emerald-100 dark:border-emerald-800">
                <Pill className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white shadow-sm text-xs font-bold rounded-full">Uso Contínuo</span>
            </div>
            <h3 className="font-bold text-xl mb-1">Losartana Potássica 50mg</h3>
            <p className="text-sus-muted text-sm mb-4">Tomar 1 comprimido ao dia, pela manhã.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-3 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Próxima retirada liberada em 20/11/2023.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
