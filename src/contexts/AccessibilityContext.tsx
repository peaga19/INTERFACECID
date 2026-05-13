"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type TextSize = "pequeno" | "medio" | "grande" | "muito-grande";

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  textSize: TextSize;
  setTextSize: (value: TextSize) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (value: boolean) => void;
  audioReader: boolean;
  setAudioReader: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("medio");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [audioReader, setAudioReader] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Toggle high contrast class
    if (highContrast) {
      root.classList.add("dark", "contrast-more");
    } else {
      root.classList.remove("dark", "contrast-more");
    }

    // Apply text size
    root.classList.remove("text-pequeno", "text-medio", "text-grande", "text-muito-grande");
    root.classList.add(`text-${textSize}`);

    // Toggle reduce motion
    if (reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    // Toggle dyslexia font
    if (dyslexiaFont) {
      root.classList.add("font-dyslexia");
    } else {
      root.classList.remove("font-dyslexia");
    }
  }, [highContrast, textSize, reduceMotion, dyslexiaFont]);

  // Audio Reader (Speechify clone)
  useEffect(() => {
    if (!audioReader) {
      window.speechSynthesis?.cancel();
      return;
    }

    const speak = (text: string) => {
      window.speechSynthesis?.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = "pt-BR";
      msg.rate = 0.9; // Um pouco mais devagar para melhor compreensão
      window.speechSynthesis?.speak(msg);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Lê o texto do elemento clicado se tiver texto
      if (target && target.innerText) {
        speak(target.innerText);
        // Opcional: Feedback visual
        const originalBg = target.style.backgroundColor;
        target.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
        setTimeout(() => {
          target.style.backgroundColor = originalBg;
        }, 1000);
      }
    };

    // Mensagem de ativação
    speak("Modo de leitura em áudio ativado. Clique em qualquer texto para ouvir.");

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
      window.speechSynthesis?.cancel();
    };
  }, [audioReader]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        textSize,
        setTextSize,
        reduceMotion,
        setReduceMotion,
        dyslexiaFont,
        setDyslexiaFont,
        audioReader,
        setAudioReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}

