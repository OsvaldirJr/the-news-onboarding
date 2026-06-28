interface ProgressBarProps {
  current: number; // índice 0-based da tela atual
  total: number;
}

/** Barra de progresso discreta em bolinhas redondas (uma por tela). */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div
      className="flex w-full items-center justify-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={[
            "rounded-full transition-all duration-300",
            i === current ? "h-2 w-4 bg-accent" : "h-2 w-2 bg-black/15",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
