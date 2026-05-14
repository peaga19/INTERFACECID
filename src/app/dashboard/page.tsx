"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { FileText, Bell, QrCode, Pill, Activity, Video } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header and Welcome */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Olá, Paulo</h1>
          <p className="text-sus-muted text-lg mt-1">Seu cartão do SUS está atualizado.</p>
        </div>
        <Link 
          href="/dashboard/notificacoes"
          className="relative inline-flex items-center justify-center rounded-xl shadow-md bg-sus-primary h-12 w-12 border-2 border-transparent hover:bg-sus-primary-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sus-accent active:scale-95"
          aria-label="Notificações"
        >
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute top-2 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-sus-primary"></span>
          </span>
        </Link>
      </header>

      {/* Carteira SUS Digital (High Fidelity Card) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-sus-primary to-blue-800 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <QrCode className="w-32 h-32" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-blue-100 font-medium tracking-wide uppercase text-sm mb-1">Cartão Nacional de Saúde</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-yellow-400 rounded-md shadow-sm opacity-90" />
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30">
                <QrCode className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div>
              <p className="text-3xl font-bold tracking-widest mb-1 drop-shadow-sm" aria-label="Número do cartão">
                701 2345 6789 0000
              </p>
              <p className="text-lg text-blue-50 font-medium">Paulo da Silva</p>
            </div>
            
            <div className="mt-8 flex gap-6 text-sm text-blue-100">
              <div>
                <span className="block text-blue-200/80 text-xs uppercase font-semibold">Nascimento</span>
                <span className="font-medium">10/05/1990</span>
              </div>
              <div>
                <span className="block text-blue-200/80 text-xs uppercase font-semibold">Sexo</span>
                <span className="font-medium">M</span>
              </div>
              <div>
                <span className="block text-blue-200/80 text-xs uppercase font-semibold">Tipo Sang.</span>
                <span className="font-medium">O+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <QuickActionCard href="/dashboard/exames" icon={FileText} title="Meus Exames" color="bg-indigo-50 dark:bg-indigo-500/10" textColor="text-indigo-600 dark:text-indigo-400" />
        <QuickActionCard href="/dashboard/medicamentos" icon={Pill} title="Medicamentos" color="bg-emerald-50 dark:bg-emerald-500/10" textColor="text-emerald-600 dark:text-emerald-400" />
        <QuickActionCard href="/dashboard/prontuario" icon={Activity} title="Prontuário" color="bg-amber-50 dark:bg-amber-500/10" textColor="text-amber-600 dark:text-amber-400" />
        <QuickActionCard href="/dashboard/token-fila" icon={QrCode} title="Token Fila" color="bg-rose-50 dark:bg-rose-500/10" textColor="text-rose-600 dark:text-rose-400" />
        <QuickActionCard href="/dashboard/telemedicina" icon={Video} title="Telemedicina" color="bg-cyan-50 dark:bg-cyan-500/10" textColor="text-cyan-600 dark:text-cyan-400" />
      </motion.div>
    </div>
  );
}

function QuickActionCard({ href, icon: Icon, title, color, textColor }: { href: string, icon: any, title: string, color: string, textColor: string }) {
  return (
    <Link href={href} className="block outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-sus-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sus-background">
      <Card interactive className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-32">
          <div className={`p-3 rounded-2xl ${color} transition-transform group-hover:scale-110`}>
            <Icon className={`w-6 h-6 ${textColor}`} />
          </div>
          <span className="font-semibold text-sus-foreground text-sm">{title}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
