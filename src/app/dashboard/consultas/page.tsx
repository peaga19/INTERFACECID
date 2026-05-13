"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarHeart, MapPin, Clock, X, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Consulta {
  id: string;
  especialidade: string;
  medico: string;
  data: string; // Ex: "14/11"
  hora: string; // Ex: "09:30"
  local: string;
}

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: "1",
      especialidade: "Clínico Geral",
      medico: "Dr. Carlos Mendes",
      data: "14/11",
      hora: "09:30",
      local: "UBS Vila Mariana",
    },
  ]);

  const [isAgendando, setIsAgendando] = useState(false);
  const [novaEspecialidade, setNovaEspecialidade] = useState("");
  const [novaData, setNovaData] = useState("");
  
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string, type: 'success' | 'error'} | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRemarcar = (id: string) => {
    setConsultas(prev => prev.map(c => {
      if (c.id === id) {
        // Logica simples: avança um dia para o próximo dia disponível fictício
        const partes = c.data.split("/");
        let dia = parseInt(partes[0]) + 1;
        let mes = partes[1];
        if (dia > 30) { dia = 1; mes = String(parseInt(mes) + 1).padStart(2, "0"); }
        const novaDataStr = `${String(dia).padStart(2, "0")}/${mes}`;
        
        showToast("Consulta Remarcada", `Sua consulta foi movida para o próximo horário disponível: ${novaDataStr} às ${c.hora}.`);
        return { ...c, data: novaDataStr };
      }
      return c;
    }));
  };

  const handleCancelar = (id: string) => {
    if (window.confirm("Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.")) {
      setConsultas(prev => prev.filter(c => c.id !== id));
      showToast("Consulta Cancelada", "A consulta foi removida da sua agenda.", "error");
    }
  };

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaEspecialidade || !novaData) {
      alert("Preencha todos os campos.");
      return;
    }

    const [ano, mes, dia] = novaData.split("-");
    const dataFormatada = `${dia}/${mes}`;

    const novaConsulta: Consulta = {
      id: Math.random().toString(36).substr(2, 9),
      especialidade: novaEspecialidade,
      medico: "Médico Disponível",
      data: dataFormatada,
      hora: "10:00", // Horário padrão de exemplo
      local: "UBS Mais Próxima",
    };

    setConsultas(prev => [...prev, novaConsulta]);
    setIsAgendando(false);
    setNovaEspecialidade("");
    setNovaData("");
    showToast("Consulta Agendada", `Agendamento confirmado para ${dataFormatada} às 10:00.`);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Minhas Consultas</h1>
          <p className="text-sus-muted text-lg mt-1">Agendamentos e histórico.</p>
        </div>
        <Button onClick={() => setIsAgendando(true)}>Agendar Nova</Button>
      </header>

      {/* Toast Animado */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 border-2 ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' 
                : 'bg-red-50 border-red-500 text-red-800 dark:bg-red-950 dark:text-red-200'
            }`}
          >
            {toastMessage.type === 'success' ? <Check className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            <div>
              <p className="font-bold">{toastMessage.title}</p>
              <p className="text-sm opacity-90">{toastMessage.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-bold">Próximas Consultas</h2>
        
        <AnimatePresence mode="popLayout">
          {consultas.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700"
            >
              <CalendarHeart className="w-12 h-12 text-sus-muted mx-auto mb-3 opacity-50" />
              <p className="text-sus-muted font-medium text-lg">Você não possui consultas agendadas.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsAgendando(true)}>
                Agendar Primeira Consulta
              </Button>
            </motion.div>
          )}

          {consultas.map((consulta) => (
            <motion.div
              key={consulta.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
            >
              <Card className="border-l-4 border-l-sus-primary overflow-hidden">
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl shrink-0">
                      <CalendarHeart className="w-6 h-6 text-sus-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{consulta.especialidade}</h3>
                      <p className="text-sus-foreground font-medium">{consulta.medico}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-sus-muted mt-2">
                        <span className="flex items-center gap-1 font-bold text-sus-primary dark:text-blue-400">
                          <Clock className="w-4 h-4"/> {consulta.data} - {consulta.hora}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4"/> {consulta.local}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleRemarcar(consulta.id)}>
                      Remarcar
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1 sm:flex-none bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                      onClick={() => handleCancelar(consulta.id)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal de Agendamento */}
      <AnimatePresence>
        {isAgendando && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAgendando(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full max-w-md bg-sus-surface border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <form onSubmit={handleAgendar} className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-sus-foreground">Nova Consulta</h3>
                  <button type="button" onClick={() => setIsAgendando(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <X className="w-5 h-5 text-sus-muted" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-sus-foreground ml-1">Especialidade</label>
                    <select 
                      required
                      value={novaEspecialidade}
                      onChange={(e) => setNovaEspecialidade(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-sus-foreground focus:border-sus-primary focus:ring-0 outline-none transition-colors"
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="Clínico Geral">Clínico Geral</option>
                      <option value="Cardiologista">Cardiologista</option>
                      <option value="Pediatra">Pediatra</option>
                      <option value="Ortopedista">Ortopedista</option>
                      <option value="Oftalmologista">Oftalmologista</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-sus-foreground ml-1">Data Desejada</label>
                    <input 
                      type="date"
                      required
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-sus-foreground focus:border-sus-primary focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button type="submit" className="w-full h-12 text-lg">Confirmar Agendamento</Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
