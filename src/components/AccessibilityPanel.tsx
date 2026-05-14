"use client";

import React, { useState } from "react";
import { useAccessibility, TextSize } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/Button";
import { Settings, Eye, Type, Activity, BookOpen, X, Volume2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    textSize,
    setTextSize,
    reduceMotion,
    setReduceMotion,
    dyslexiaFont,
    setDyslexiaFont,
    audioReader,
    setAudioReader,
  } = useAccessibility();

  return (
    <>
      <div className="fixed bottom-24 sm:bottom-6 right-6 z-50">
        <Button
          variant="primary"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir painel de configurações e acessibilidade"
          aria-expanded={isOpen}
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700"
        >
          <Settings className="w-6 h-6 text-white" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-24 sm:w-96 bg-sus-surface border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[80vh]"
              role="dialog"
              aria-labelledby="a11y-title"
            >
              <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 id="a11y-title" className="text-xl font-bold text-sus-foreground">
                    Configurações
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Fechar painel">
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Seção de Tema */}
                  <div className="p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sus-foreground">
                        <Sun className="w-5 h-5 dark:hidden" />
                        <Moon className="w-5 h-5 hidden dark:block" />
                      </div>
                      <div>
                        <div className="font-semibold text-sus-foreground">Aparência</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ThemeButton 
                        label="Modo Claro" 
                        icon={<Sun className="w-4 h-4" />} 
                        active={theme === "light"} 
                        onClick={() => setTheme("light")} 
                      />
                      <ThemeButton 
                        label="Modo Escuro" 
                        icon={<Moon className="w-4 h-4" />} 
                        active={theme === "dark"} 
                        onClick={() => setTheme("dark")} 
                      />
                    </div>
                  </div>

                  <A11yOption
                    icon={<Eye className="w-5 h-5" />}
                    title="Alto Contraste (Real)"
                    description="Cores vibrantes para máxima visibilidade"
                    isActive={highContrast}
                    onClick={() => setHighContrast(!highContrast)}
                  />
                  
                  {/* Tamanho do Texto Customizado */}
                  <div className="p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sus-foreground">
                        <Type className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sus-foreground">Tamanho do Texto</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <SizeButton label="P" active={textSize === "pequeno"} onClick={() => setTextSize("pequeno")} />
                      <SizeButton label="M" active={textSize === "medio"} onClick={() => setTextSize("medio")} />
                      <SizeButton label="G" active={textSize === "grande"} onClick={() => setTextSize("grande")} />
                      <SizeButton label="GG" active={textSize === "muito-grande"} onClick={() => setTextSize("muito-grande")} />
                    </div>
                  </div>

                  <A11yOption
                    icon={<Activity className="w-5 h-5" />}
                    title="Reduzir Animações"
                    description="Foco extremo em performance e sem movimento"
                    isActive={reduceMotion}
                    onClick={() => setReduceMotion(!reduceMotion)}
                  />
                  
                  <div className="space-y-2">
                    <A11yOption
                      icon={<BookOpen className="w-5 h-5" />}
                      title="Modo Acessibilidade"
                      description="Fonte otimizada para leitura"
                      isActive={dyslexiaFont}
                      onClick={() => setDyslexiaFont(!dyslexiaFont)}
                    />
                    
                    {dyslexiaFont && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pl-4">
                        <A11yOption
                          icon={<Volume2 className="w-5 h-5" />}
                          title="Áudio (Speechify)"
                          description="Clique nos textos para ouvir"
                          isActive={audioReader}
                          onClick={() => setAudioReader(!audioReader)}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeButton({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all border-2 ${
        active 
          ? "bg-sus-primary text-white border-sus-primary shadow-md" 
          : "bg-slate-50 dark:bg-slate-800/50 text-sus-muted border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function SizeButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 rounded-md font-bold transition-colors ${
        active 
          ? "bg-sus-primary text-white" 
          : "bg-slate-100 dark:bg-slate-800 text-sus-muted hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function A11yOption({
  icon,
  title,
  description,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all w-full text-left ${
        isActive
          ? "border-sus-primary bg-sus-primary/5"
          : "border-slate-100 dark:border-slate-800 hover:border-sus-primary/30"
      }`}
      aria-pressed={isActive}
    >
      <div className={`p-2 rounded-lg ${isActive ? "bg-sus-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-sus-foreground"}`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sus-foreground">{title}</div>
        <div className="text-sm text-sus-muted">{description}</div>
      </div>
      <div className="ml-auto">
        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isActive ? "bg-sus-primary" : "bg-slate-300 dark:bg-slate-700"}`}>
          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isActive ? "translate-x-6" : "translate-x-0"}`} />
        </div>
      </div>
    </button>
  );
}

