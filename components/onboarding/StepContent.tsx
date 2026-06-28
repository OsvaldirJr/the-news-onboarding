"use client";

import { useState } from "react";
import type { OnboardingStep } from "@/lib/onboarding";

interface StepContentProps {
  step: OnboardingStep;
}

/* --- Ícones inline minimalistas (sem dependências externas) --------- */

function BookmarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 3a2 2 0 0 0-2 2v15.382a.6.6 0 0 0 .9.52L12 17l7.1 3.902a.6.6 0 0 0 .9-.52V5a2 2 0 0 0-2-2H6z" />
    </svg>
  );
}

function HeadphonesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="14" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
      <rect x="17.5" y="14" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CoffeeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

function CapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2C8 2 4 6 4 10v2h16v-2c0-4-4-8-8-8z" />
      <path d="M2 12h20v2H2v-2z" />
      <path d="M12 2v2" />
    </svg>
  );
}

/* --- Blocos de conteúdo por tipo de tela --------------------------- */

function ChoiceBlock() {
  return (
    <div className="mt-32 w-full flex flex-col gap-24 relative z-10">
      <div className="text-center w-full">
        <span className="text-[22px] font-extrabold text-ink tracking-tight">ler as notícias do dia</span>
      </div>
      <div className="text-right w-full pr-8">
        <span className="text-[22px] font-extrabold text-ink tracking-tight">Ou ...</span>
      </div>
    </div>
  );
}

function CardBlock({ step }: { step: OnboardingStep }) {
  return (
    <div className="mt-12 flex flex-col items-center w-full px-6 relative z-10">
      <div className="w-full rounded-[40px] bg-[#F2F2F2] px-8 py-12 flex flex-col items-center justify-center relative shadow-sm border border-black/5">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-brand text-ink shadow-sm">
          <BookmarkIcon className="h-7 w-7 opacity-80" />
        </div>
        <h2 className="mt-8 text-center text-[26px] font-extrabold text-ink leading-[1.1] whitespace-pre-line tracking-tight">
          {step.title}
        </h2>
        {step.description && (
          <p className="mt-4 text-center text-[16px] font-medium leading-relaxed text-ink/60 whitespace-pre-line">
            {step.description}
          </p>
        )}
      </div>
    </div>
  );
}

function AudioBlock() {
  return (
    <div className="mt-48 w-full flex flex-col items-center relative z-10">
      <div className="text-[24px] font-extrabold leading-[1.2] text-ink tracking-tight text-left">
        Ouvir as edições em<br />audio
      </div>
    </div>
  );
}

function BooksBlock() {
  return (
    <div className="mt-12 flex gap-4 items-center w-full relative z-10 px-2">
      {/* Livro */}
      <div className="relative h-[220px] w-[150px] rounded-sm shadow-2xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#4A4A4A] via-[#2D2D2D] to-[#121212]">
        {/* Efeito de brilho na capa */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-4" />
        {/* Outro reflexo mais forte */}
        <div className="absolute -inset-10 bg-gradient-to-b from-white/20 to-transparent transform -rotate-45 translate-x-12 translate-y-12 blur-sm" />
        <div className="absolute bottom-5 left-4 right-2 flex flex-col gap-1">
          <span className="text-[#EBC256] text-[11px] font-extrabold tracking-widest leading-tight">
            LEITURA DA<br />SEMANA
          </span>
          <span className="text-white text-[14px] font-medium leading-snug">
            O Futuro das<br />Metrópoles
          </span>
        </div>
      </div>
      
      {/* Citação */}
      <div className="flex flex-col items-center flex-1 px-1 mt-4">
        <span className="text-[#BBA169] text-5xl font-serif leading-none h-6 block">
          &rdquo;
        </span>
        <p className="mt-4 text-center text-[13px] font-medium text-ink/80 leading-relaxed">
          "Uma obra essencial<br/>para entender a<br/>nova dinâmica<br/>global."
        </p>
      </div>
    </div>
  );
}

function ShareBlock() {
  return null;
}

function PlansBlock() {
  return (
    <div className="mt-8 flex flex-col gap-0 w-full max-w-[320px] mx-auto relative z-10">
      <div className="flex gap-4 mb-4 px-1">
        {/* Nível Ouro */}
        <div className="flex-1 aspect-square bg-white border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3">
          <svg className="w-10 h-10 text-[#222] fill-current" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-[14px] font-bold text-ink leading-tight">Nível Ouro</span>
        </div>
        {/* Desbloqueios */}
        <div className="flex-1 aspect-square bg-[#FCE154] border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3">
          <svg className="w-10 h-10 text-[#222]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span className="text-[14px] font-bold text-[#222] leading-tight">Desbloqueios</span>
        </div>
      </div>
      {/* Leitor Pro */}
      <div className="w-full bg-[#1A1A1A] text-white p-6 flex items-center justify-between shadow-md h-32 relative">
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-white/60 tracking-widest mb-1 uppercase">STATUS ATUAL</span>
          <span className="font-bold text-[22px] tracking-tight">Leitor Pro</span>
        </div>
        <svg className="w-12 h-12 text-[#FCE154]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.134 15.866 1 12 1C8.134 1 5 4.134 5 8C5 11.866 8.134 15 12 15Z"/>
          <path d="M7.5 13V22.5L12 19L16.5 22.5V13" />
          <circle cx="12" cy="8" r="6" fill="#1A1A1A"/>
          <polygon points="12 5.5 13.1 7.2 15.2 7.4 13.6 8.8 14 10.8 12 9.8 10 10.8 10.4 8.8 8.8 7.4 10.9 7.2" fill="#FCE154"/>
        </svg>
      </div>
    </div>
  );
}

function ProfileBlock({ step }: { step: OnboardingStep }) {
  return (
    <div className="mt-8 flex flex-col items-center relative z-20">
      <div className="flex h-44 w-44 items-center justify-center rounded-full border border-ink bg-[#D9D9D9] relative">
        <svg viewBox="0 0 24 24" className="h-[84px] w-[84px] text-[#555] fill-current" aria-hidden>
          <path d="M12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2ZM12 14C8.67 14 2 15.67 2 19V22H22V19C22 15.67 15.33 14 12 14Z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pt-3">
          <svg className="w-10 h-10 text-[#222]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 8V20H20V8H4ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18Z" />
            <circle cx="12" cy="13" r="2.5" />
            <path d="M21 4H18V1H16V4H13V6H16V9H18V6H21V4Z" />
          </svg>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-black/10"></div>
      </div>
      {step.description && (
        <p className="mt-12 text-center text-[15.5px] font-medium leading-relaxed text-ink/75 max-w-[280px]">
          {step.description}
        </p>
      )}
    </div>
  );
}

/* --- Componente principal ------------------------------------------ */

export default function StepContent({ step }: StepContentProps) {
  const isDone = step.kind === "done";
  const isBridge = step.kind === "bridge";
  const isIntro = step.kind === "intro";

  let layout = "justify-start pt-6 text-left px-8";
  if (isBridge) layout = "items-start pt-[35%] justify-start text-left px-12";
  if (isIntro) layout = "items-center justify-center text-center px-6";
  if (step.kind === "concept") layout = "items-start justify-start pt-[18%] px-12";
  if (step.kind === "card") layout = "items-center justify-center px-2";
  if (step.kind === "audio") layout = "items-center justify-start pt-[20%] text-center px-6";
  if (step.kind === "books") layout = "items-center justify-start pt-[12%] text-center px-6";
  if (step.kind === "share") layout = "items-center justify-center text-center px-6";
  if (step.kind === "plans") layout = "items-center justify-start pt-[25%] text-center px-6";
  if (step.kind === "profile") layout = "items-center justify-start pt-[15%] text-center px-6";
  if (step.kind === "done") layout = "items-center justify-start pt-[35%] text-center px-6";

  return (
    <div
      key={step.id}
      className={["flex h-full w-full flex-col", layout, "animate-fadeUp"].join(" ")}
    >
      {/* Eyebrow */}
      {step.eyebrow && !isBridge && !isIntro && (
        <p className="mb-4 text-[13px] font-bold uppercase tracking-widest text-ink/50">
          {step.eyebrow}
        </p>
      )}

      {isIntro && step.eyebrow && (
        <p className="mb-6 text-[18px] font-medium leading-snug text-ink/70">
          {step.eyebrow}
        </p>
      )}

      {/* Título renderizado com <br/> na string (tratar \n como quebra de linha) */}
      {(step.title && step.kind !== "card" && step.kind !== "plans" && step.kind !== "choice") && (
        <h1
          className={[
            "text-ink whitespace-pre-line",
            (isIntro || step.kind === "concept")
              ? "font-extrabold text-[54px] leading-[1]"
              : isBridge
              ? "font-extrabold leading-tight text-5xl relative inline-block mt-12"
              : (step.kind === "audio" || step.kind === "books" || step.kind === "share" || step.kind === "profile" || step.kind === "done")
              ? "font-extrabold leading-[1.05] text-[48px]"
              : "font-extrabold leading-[1.05] text-[40px]",
          ].join(" ")}
        >
          {/* Tratamento especial para o 'conceito > how to' (colorir o > de amarelo) */}
          {step.kind === "concept" ? (
            <div className="flex flex-col items-start text-left">
              <span className="tracking-tight">conceito</span>
              <span className="text-brand text-[80px] font-black leading-[0.6] block py-1">&gt;</span>
              <span className="tracking-tight">how to</span>
            </div>
          ) : step.kind === "bridge" ? (
            <div className="flex flex-col items-start w-full">
              <span>{step.title}</span>
              <div className="mt-1 h-[14.04px] w-[170px] bg-[#FCE154]" />
            </div>
          ) : (
            step.title
          )}
        </h1>
      )}
      
      {/* Para telas como choice e plans, o título é renderizado condicionalmente se houver */}
      {(step.kind === "choice" || step.kind === "plans") && step.title && (
        <h1 className={["text-ink whitespace-pre-line font-extrabold leading-[1.05]", step.kind === "choice" ? "text-[46px]" : "text-[26px] tracking-tight"].join(" ")}>
          {step.title}
        </h1>
      )}

      {/* Description */}
      {step.description && step.kind !== "card" && step.kind !== "profile" && (
        <p
          className={[
            "mt-6 text-[16px] font-medium leading-relaxed whitespace-pre-line",
            isBridge ? "mx-auto max-w-xs text-ink/60" : "max-w-sm text-ink/60",
            step.kind === "concept" ? "mt-auto mb-[20%] text-ink/75 self-center text-center" : "",
            step.kind === "books" ? "mt-6 text-ink/70 text-[15.5px]" : "",
            step.kind === "done" ? "mt-10 text-ink/75 text-[15.5px] px-2 z-10" : ""
          ].join(" ")}
        >
          {step.description}
        </p>
      )}

      {/* Blocos Específicos */}
      {step.kind === "choice" && <ChoiceBlock />}
      {step.kind === "card" && <CardBlock step={step} />}
      
      {step.kind === "audio" && <AudioBlock />}
      {step.kind === "books" && <BooksBlock />}
      {step.kind === "share" && <ShareBlock />}
      {step.kind === "plans" && <PlansBlock />}
      {step.kind === "profile" && <ProfileBlock step={step} />}

    </div>
  );
}
