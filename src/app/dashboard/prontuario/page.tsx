"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Activity, Calendar } from "lucide-react";

export default function ProntuarioPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Prontuário Eletrônico</h1>
        <p className="text-sus-muted text-lg mt-1">Seu histórico médico unificado.</p>
      </header>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 mt-8 space-y-8 pb-8">
        <div className="relative pl-6">
          <div className="absolute w-4 h-4 bg-sus-primary rounded-full -left-[9px] top-1 border-4 border-white dark:border-slate-900"></div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sus-primary font-bold text-sm mb-2">
                <Calendar className="w-4 h-4" /> 10/10/2023
              </div>
              <h3 className="font-bold text-lg mb-2">Atendimento de Urgência (UPA 24h)</h3>
              <p className="text-sus-muted">Paciente deu entrada com queixa de dores abdominais e febre leve. Realizado exame de sangue e prescrito analgésico.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="relative pl-6">
          <div className="absolute w-4 h-4 bg-slate-300 dark:bg-slate-700 rounded-full -left-[9px] top-1 border-4 border-white dark:border-slate-900"></div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sus-muted font-bold text-sm mb-2">
                <Calendar className="w-4 h-4" /> 15/06/2023
              </div>
              <h3 className="font-bold text-lg mb-2">Consulta de Rotina (UBS)</h3>
              <p className="text-sus-muted">Checkup anual. Sinais vitais normais. Renovada a receita de uso contínuo.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
