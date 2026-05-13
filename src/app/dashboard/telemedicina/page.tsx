"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Video, Phone, CalendarHeart, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const especialistas = [
  { nome: "Dr. Drauzio Varella", especialidade: "Clínico Geral / Oncologista", telefone: "(11) 3045-1000" },
  { nome: "Dra. Ana Escobar", especialidade: "Pediatra", telefone: "(11) 3032-2500" },
  { nome: "Dr. Roberto Kalil Filho", especialidade: "Cardiologista", telefone: "(11) 3155-0200" },
  { nome: "Dr. Lair Ribeiro", especialidade: "Nutrólogo / Cardiologista", telefone: "(11) 3078-4455" },
  { nome: "Dr. Fernando Fernandes", especialidade: "Ortopedista", telefone: "(21) 2537-8900" },
  { nome: "Dra. Nise Yamaguchi", especialidade: "Imunologista", telefone: "(11) 3062-3100" },
];

export default function TelemedicinaPage() {
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [connected, setConnected] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Barra de carregamento com porcentagem
  useEffect(() => {
    if (!connecting) return;

    setProgress(0);
    setConnected(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConnected(true);
          setConnecting(false);
          return 100;
        }
        // Simulação realista: começa rápido, desacelera no meio, acelera no fim
        const increment = prev < 30 ? 4 : prev < 70 ? 2 : prev < 90 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [connecting]);

  // Countdown para redirecionamento ao Google
  useEffect(() => {
    if (!showRedirectModal) return;
    setRedirectCountdown(5);

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open("https://www.google.com/search?q=m%C3%A9dicos+especialistas+perto+de+mim", "_blank");
          setShowRedirectModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showRedirectModal]);

  const handleConectar = useCallback(() => {
    if (connecting || connected) return;
    setConnecting(true);
  }, [connecting, connected]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">Telemedicina</h1>
        <p className="text-sus-muted text-lg mt-1">Consultas online com especialistas.</p>
      </header>

      <div className="grid gap-6 mt-8 md:grid-cols-2">
        {/* Card Conectar */}
        <Card className="bg-cyan-50 dark:bg-slate-800 border-2 border-cyan-400 dark:border-cyan-600 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
          <CardContent className="p-8 flex flex-col items-center text-center gap-4 relative z-10">
            <div className="w-20 h-20 bg-white dark:bg-slate-700 shadow-sm border border-cyan-100 dark:border-slate-600 rounded-full flex items-center justify-center">
              <Video className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Entrar na Sala</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Sua consulta com o Clínico Geral começa em 10 minutos.</p>

            {/* Estado: Idle */}
            {!connecting && !connected && (
              <Button
                className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700 text-white border-0 shadow-md text-lg h-14"
                onClick={handleConectar}
              >
                Conectar Agora
              </Button>
            )}

            {/* Estado: Carregando com barra */}
            {connecting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-2 space-y-3"
              >
                <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
                  Conectando... {progress}%
                </p>
                <div className="w-full h-5 bg-white dark:bg-slate-700 rounded-full border-2 border-slate-200 dark:border-slate-600 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
                <p className="text-xs text-sus-muted">Estabelecendo conexão segura com o servidor...</p>
              </motion.div>
            )}

            {/* Estado: Conectado */}
            {connected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-2 p-4 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-400 dark:border-emerald-700 rounded-xl"
              >
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  ✅ Conectado com sucesso!
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  Aguardando o médico entrar na sala...
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Card Buscar Especialista */}
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <CalendarHeart className="w-10 h-10 text-sus-primary" />
            </div>
            <h3 className="font-bold text-xl">Agendar Teleconsulta</h3>
            <p className="text-sus-muted">Encontre horários disponíveis para atendimento remoto.</p>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setShowRedirectModal(true)}
            >
              Buscar Especialista
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerta SAMU */}
      <div className="mt-8">
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <Phone className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Atenção: Em caso de emergência grave (falta de ar, dor no peito forte), ligue para o SAMU no número 192 ou dirija-se à UPA mais próxima.
          </p>
        </div>
      </div>

      {/* Modal de Redirecionamento */}
      <AnimatePresence>
        {showRedirectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRedirectModal(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[500px] bg-sus-surface border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-sus-foreground flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-sus-primary" />
                    Redirecionamento Externo
                  </h3>
                  <button onClick={() => setShowRedirectModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="w-5 h-5 text-sus-muted" />
                  </button>
                </div>

                <div className="bg-blue-600 dark:bg-blue-700 rounded-xl p-5 mb-5 shadow-inner">
                  <p className="text-sm font-semibold text-white">
                    Você será redirecionado para uma página do Google para buscar especialistas disponíveis na sua região.
                  </p>
                  <p className="text-sm text-blue-100 mt-2 font-medium">
                    Redirecionando em <span className="font-black text-xl text-white">{redirectCountdown}</span> segundo{redirectCountdown !== 1 ? "s" : ""}...
                  </p>
                </div>

                <div className="space-y-3 mb-5">
                  <p className="text-sm font-bold text-sus-foreground">Especialistas de referência:</p>
                  {especialistas.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-700/80 rounded-xl border border-slate-200 dark:border-slate-600">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{doc.nome}</p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{doc.especialidade}</p>
                      </div>
                      <span className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300 whitespace-nowrap bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-md">{doc.telefone}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRedirectModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      window.open("https://www.google.com/search?q=m%C3%A9dicos+especialistas+perto+de+mim", "_blank");
                      setShowRedirectModal(false);
                    }}
                  >
                    Ir Agora
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
