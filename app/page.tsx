"use client";

import { useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

/**
 * Página que unifica todo o fluxo de onboarding.
 * Ao concluir, exibe uma tela simples de "entrada no app" — substitua o
 * conteúdo de `finished` por um router.push("/feed"), por exemplo.
 */
export default function Page() {
  const [finished, setFinished] = useState(false);

  if (finished) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-dark">
            THE NEWS
          </p>
          <h1 className="text-3xl font-bold text-ink">Bem-vindo(a)! 🎉</h1>
          <p className="mt-3 text-ink/60">Onboarding concluído com sucesso.</p>
          <button
            type="button"
            onClick={() => setFinished(false)}
            className="mt-6 rounded-2xl bg-ink px-6 py-3 text-sm font-bold text-white"
          >
            Rever onboarding
          </button>
        </div>
      </main>
    );
  }

  return <OnboardingLayout onFinish={() => setFinished(true)} />;
}
