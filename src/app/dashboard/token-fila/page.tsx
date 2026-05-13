"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { QrCode, Smartphone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

function gerarLetra() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letras[Math.floor(Math.random() * letras.length)];
}

function gerarNumero() {
  return Math.floor(Math.random() * 99) + 1;
}

function horaAtual() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dataAtual() {
  return new Date().toLocaleDateString("pt-BR");
}

export default function TokenFilaPage() {
  const [token, setToken] = useState(`${gerarLetra()}-${gerarNumero()}`);
  const [horaCriacao, setHoraCriacao] = useState(horaAtual());
  const [animKey, setAnimKey] = useState(0);
  const [gerando, setGerando] = useState(false);

  const gerarNovoToken = useCallback(() => {
    setGerando(true);
    // Simular uma breve requisição (UI Otimista)
    setTimeout(() => {
      setToken(`${gerarLetra()}-${gerarNumero()}`);
      setHoraCriacao(horaAtual());
      setAnimKey((k) => k + 1);
      setGerando(false);
    }, 400);
  }, []);

  return (
    <div className="space-y-6 max-w-lg mx-auto text-center">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">
          Token Fila Rápida
        </h1>
        <p className="text-sus-muted text-lg mt-1">
          Apresente este QR Code na recepção.
        </p>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mt-8 border-4 border-sus-primary">
            <CardContent className="p-8 flex flex-col items-center justify-center gap-6">
              <div className="bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm">
                <QrCode className="w-48 h-48 text-sus-foreground" />
              </div>

              <div>
                <p className="text-sus-muted font-medium mb-1">
                  Seu número de chamada:
                </p>
                <p className="text-5xl font-black tracking-widest text-sus-primary">
                  {token}
                </p>
              </div>

              <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-2"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                  Válido para {dataAtual()}.
                </div>
                <p className="text-xs text-sus-muted">
                  Gerado às {horaCriacao}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full"
        onClick={gerarNovoToken}
        isLoading={gerando}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Gerar Novo Token
      </Button>
    </div>
  );
}
