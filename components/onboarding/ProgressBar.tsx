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
            "h-2 w-2 rounded-full transition-colors duration-300",
            i <= current ? "bg-accent" : "bg-black/15",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
