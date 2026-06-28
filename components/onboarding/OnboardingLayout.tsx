"use client";

import { useState, useCallback } from "react";
import { STEPS, TOTAL_STEPS } from "@/lib/onboarding";
import ProgressBar from "./ProgressBar";
import ConnectingLine from "./ConnectingLine";
import StepContent from "./StepContent";

interface OnboardingLayoutProps {
  /** Chamado quando o usuário conclui o fluxo (tela final). */
  onFinish?: () => void;
}

/**
 * Componente de layout base do onboarding.
 * Gerencia a tela atual, a barra de progresso, o cabeçalho fixo e o botão
 * inferior, além de orquestrar a transição lateral entre as telas.
 */
export default function OnboardingLayout({ onFinish }: OnboardingLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLast = currentStep === TOTAL_STEPS - 1;
  const active = STEPS[currentStep];

  const goNext = useCallback(() => {
    if (isLast) {
      onFinish?.();
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [isLast, onFinish]);

  // Fecha / pula o onboarding (botão X do cabeçalho).
  const close = useCallback(() => {
    onFinish?.();
  }, [onFinish]);

  return (
    <div className="flex min-h-screen items-stretch justify-center sm:items-center sm:py-8">
      {/* "Device" mobile — max-w-md centralizado no desktop */}
      <div className="relative flex h-screen w-full max-w-md flex-col overflow-hidden bg-white sm:h-[844px] sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-1 sm:ring-black/5">
        {/* Cabeçalho fixo: sol (esq) · THE NEWS (centro) · X (dir) */}
        <header className="relative z-20 shrink-0 px-6 pb-4 pt-6">
          <div className="flex items-center justify-between">
            {/* Ícone de sol à esquerda */}
            <button
              type="button"
              aria-label="Tema"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>

            {/* Título central — Inter bold 28px */}
            <span className="select-none text-[28px] font-bold tracking-tight text-ink">
              THE NEWS
            </span>

            {/* Ícone X à direita */}
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Área das telas (track com transição lateral) */}
        <main className="relative z-10 flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{
              width: `${TOTAL_STEPS * 100}%`,
              transform: `translateX(-${currentStep * (100 / TOTAL_STEPS)}%)`,
            }}
          >
            {STEPS.map((step, i) => (
              <section
                key={step.id}
                className="relative h-full shrink-0"
                style={{ width: `${100 / TOTAL_STEPS}%` }}
                aria-hidden={i !== currentStep}
              >
                {/* Linha conectora ao fundo desta tela */}
                <ConnectingLine stepIndex={i} active={i === currentStep} />
                {/* Conteúdo por cima da linha */}
                <div className="relative z-10 h-full overflow-y-auto pb-4">
                  {i === currentStep && <StepContent step={step} />}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* Rodapé fixo: progress bar (acima) + botão de avanço */}
        <footer className="relative z-20 shrink-0 px-6 pb-8 pt-4">
          <div className="mb-5">
            <ProgressBar current={currentStep} total={TOTAL_STEPS} />
          </div>
          <button
            type="button"
            onClick={goNext}
            className="w-full rounded-full bg-accent py-4 text-base font-bold text-ink transition-transform active:scale-[0.98]"
          >
            {active.cta}
          </button>
        </footer>
      </div>
    </div>
  );
}
