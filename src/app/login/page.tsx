"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
    setError("");
  };

  const handleCpfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.length < 14) {
      setError("Por favor, insira um CPF válido.");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setError("");
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha.length < 4) {
      setError("Senha incorreta.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#0f172a]">
      
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-[45%] flex flex-col p-8 lg:p-12 xl:p-20 relative z-10 bg-white dark:bg-[#0f172a] min-h-screen">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="bg-sus-primary p-2 rounded-xl">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sus-primary dark:text-white text-2xl font-black tracking-tight leading-none">Meu SUS</h1>
            <p className="text-sus-muted text-sm font-semibold tracking-widest uppercase">Digital</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              Acesse sua <span className="text-[#1351b4] dark:text-blue-400">conta</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#1351b4] dark:bg-blue-400 rounded-full mb-5"></div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Faça login com sua conta <strong className="text-slate-700 dark:text-white">gov.br</strong> para acessar seus exames, consultas, vacinas e muito mais.
            </p>
          </div>

          <Card className="shadow-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl">
            <CardContent className="p-6 sm:p-8 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleCpfSubmit} className="flex flex-col gap-6">
                      <Input
                        label="CPF"
                        type="text"
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChange={handleCpfChange}
                        error={error}
                        maxLength={14}
                        autoComplete="off"
                        inputMode="numeric"
                        aria-label="Insira seu número de CPF"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg shadow-md bg-[#1351b4] hover:bg-[#0c326f] text-white border-0 rounded-xl"
                        isLoading={isLoading}
                      >
                        <User className="mr-2 h-5 w-5" />
                        Continuar
                      </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 text-center">
                      <a href="#" className="text-[#1351b4] dark:text-blue-400 hover:underline font-bold text-sm">
                        O que é o gov.br?
                      </a>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="text-xs text-sus-muted uppercase font-bold tracking-wider mb-1">CPF Informado</p>
                        <p className="text-sus-foreground font-semibold font-mono">{cpf}</p>
                      </div>
                      <button 
                        onClick={() => { setStep(1); setError(""); setSenha(""); }}
                        className="p-2 text-[#1351b4] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors flex items-center gap-1 text-sm font-bold"
                        type="button"
                      >
                        <ChevronLeft className="w-4 h-4" /> Alterar
                      </button>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
                      <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha gov.br"
                        value={senha}
                        onChange={(e) => { setSenha(e.target.value); setError(""); }}
                        error={error}
                        autoComplete="current-password"
                        aria-label="Insira sua senha"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg shadow-md bg-[#1351b4] hover:bg-[#0c326f] text-white border-0 rounded-xl"
                        isLoading={isLoading}
                      >
                        Entrar
                      </Button>
                      
                      <div className="text-center mt-2">
                        <a href="#" className="text-[#1351b4] dark:text-blue-400 hover:underline font-bold text-sm">
                          Esqueci minha senha
                        </a>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
          
          <p className="text-xs text-sus-muted text-center mt-10">
            Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </div>
      </div>

      {/* Lado Direito - Imagem e Elementos Visuais */}
      <div className="hidden lg:flex w-[55%] bg-slate-50 dark:bg-[#0b1120] relative items-center justify-center p-12 overflow-hidden">
        
        {/* Formas Orgânicas Decorativas baseadas no exemplo */}
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

        <div className="relative w-full max-w-2xl aspect-[4/3] z-10">
          {/* Fundo decorativo (Amarelo) do exemplo */}
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-400 rounded-[3rem] rounded-br-[10rem] -z-10" />
          {/* Fundo decorativo (Azul) do exemplo */}
          <div className="absolute -top-6 -left-6 w-full h-full bg-[#1351b4] rounded-[2rem] -z-10" />
          
          {/* Imagem Principal */}
          <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <Image 
              src="/hero-login.png" 
              alt="Médico sorrindo conversando com paciente idosa"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>

    </div>
  );
}
