import { WAVE_VIEWBOX, getWaveSegment } from "@/lib/onboarding";

interface ConnectingLineProps {
  stepIndex: number;
  /** Quando true, re-dispara a animação de "desenho" do traço. */
  active?: boolean;
}

/**
 * SVG de fundo, em posição absoluta, que desenha o segmento da linha amarela
 * para a tela atual. Usa preserveAspectRatio="none" para preencher exatamente
 * o container mobile — assim os pontos de entrada/saída batem entre as telas
 * independentemente da largura do dispositivo.
 */
export default function ConnectingLine({
  stepIndex,
  active = false,
}: ConnectingLineProps) {
  const d = getWaveSegment(stepIndex);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${WAVE_VIEWBOX.width} ${WAVE_VIEWBOX.height}`}
      preserveAspectRatio="none"
    >
      {/* Linha principal — animada via stroke-dashoffset (pathLength=1) */}
      <path
        // key força o React a remontar o nó e reiniciar a animação na troca de tela
        key={active ? `on-${stepIndex}` : `off-${stepIndex}`}
        d={d}
        fill="none"
        stroke="#FCE154"
        strokeWidth={14.04}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        className={active ? "animate-drawLine" : undefined}
        style={active ? undefined : { strokeDashoffset: 0 }}
      />
    </svg>
  );
}
