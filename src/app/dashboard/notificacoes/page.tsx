"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Bell, Syringe, FileText, CalendarHeart } from "lucide-react";

export default function NotificacoesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Notificações</h1>
        <p className="text-sus-muted text-lg mt-1">Seus alertas e mensagens.</p>
      </header>

      <div className="space-y-4 mt-8">
        <NotificationItem 
          icon={Syringe} 
          title="Campanha de Vacinação" 
          desc="A vacina contra a gripe já está disponível na sua UBS de referência."
          time="Há 2 horas"
          unread={true}
          color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <NotificationItem 
          icon={FileText} 
          title="Resultado de Exame" 
          desc="Seu hemograma completo já está disponível para visualização."
          time="Ontem"
          unread={false}
          color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        />
        <NotificationItem 
          icon={CalendarHeart} 
          title="Lembrete de Consulta" 
          desc="Você tem uma consulta agendada amanhã às 09:30."
          time="Há 2 dias"
          unread={false}
          color="bg-blue-100 text-sus-primary dark:bg-blue-900/30 dark:text-blue-400"
        />
      </div>
    </div>
  );
}

function NotificationItem({ icon: Icon, title, desc, time, unread, color }: any) {
  return (
    <Card className={`transition-colors ${unread ? 'bg-sus-primary/5 border-sus-primary/30' : ''}`}>
      <CardContent className="p-4 sm:p-6 flex items-start gap-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-bold text-lg ${unread ? 'text-sus-foreground' : 'text-sus-foreground/80'}`}>{title}</h3>
            {unread && <span className="w-2.5 h-2.5 bg-red-500 rounded-full mt-1.5"></span>}
          </div>
          <p className="text-sus-muted mt-1">{desc}</p>
          <p className="text-xs font-semibold text-sus-muted mt-2 uppercase">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}
