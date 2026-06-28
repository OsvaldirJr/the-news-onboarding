/**
 * Fonte única de verdade do fluxo de onboarding.
 *
 * A "linha conectora" amarela é tratada como UMA curva contínua que atravessa
 * todas as telas de cima para baixo. Cada tela renderiza apenas o seu segmento,
 * mas o ponto X em que a linha SAI pela base de uma tela é exatamente o ponto X
 * em que ela ENTRA pelo topo da tela seguinte (continuidade vertical garantida).
 */

export type StepKind =
  | "intro"
  | "concept"
  | "choice"
  | "card"
  | "audio"
  | "bridge"
  | "books"
  | "share"
  | "plans"
  | "profile"
  | "done";

export interface OnboardingStep {
  id: number;
  kind: StepKind;
  /** Texto pequeno acima do título (opcional). */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Label do botão inferior. */
  cta: string;
}

export const STEPS: OnboardingStep[] = [
  {
    id: 1,
    kind: "intro",
    eyebrow: "antes de mais nada, saiba que...",
    title: "Este não é\num tutorial\ncomum",
    cta: "Próximo",
  },
  {
    id: 2,
    kind: "concept",
    title: "conceito\n>\nhow to",
    description:
      "Sem complicação e sem manuais.\nTe explicamos a ideia, e você\ndescobre o resto explorando.",
    cta: "Próximo",
  },
  {
    id: 3,
    kind: "choice",
    title: "O que você\nprefere?",
    cta: "Próximo",
  },
  {
    id: 4,
    kind: "card",
    title: "salvar para ler\ndepois",
    description:
      "Sem tempo agora? Toque no marcador\ne a gente guarda a matéria pra\nquando você puder.",
    cta: "Próximo",
  },
  {
    id: 5,
    kind: "audio",
    title: "criamos um\napp em que\nvocê pode",
    cta: "Próximo",
  },
  {
    id: 6,
    kind: "bridge",
    title: "Ou ..",
    cta: "Próximo",
  },
  {
    id: 7,
    kind: "books",
    title: "Explorar\nindicações de\nlivros",
    description: "Mergulhe em resenhas profundas e\ncuradoria especializada. Encontre sua\npróxima grande leitura baseada nos\ntópicos que movem o mundo hoje.",
    cta: "Próximo",
  },
  {
    id: 8,
    kind: "share",
    title: "Até mesmo\nindicar para\namigos, e\nainda ...",
    cta: "Próximo",
  },
  {
    id: 9,
    kind: "plans",
    title: "Ganhar recompensas",
    cta: "Próximo",
  },
  {
    id: 10,
    kind: "profile",
    title: "Seja você\nmesmo",
    description: "Monte seu perfil, adicione sua\nfoto e curta as novidades",
    cta: "Próximo",
  },
  {
    id: 11,
    kind: "done",
    title: "Tudo pronto!",
    description: "Você chegou ao fim do nosso tour.\nPrepare-se para uma nova forma de\nconsumir notícias, desenhada\nespecialmente para você.",
    cta: "Let's go!!!!",
  },
];

export const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/* Geometria da linha conectora                                        */
/* ------------------------------------------------------------------ */

/** viewBox usado por TODAS as telas (preserveAspectRatio="none"). */
export const WAVE_VIEWBOX = { width: 390, height: 720 } as const;

/**
 * Posições X (no sistema do viewBox) por onde a linha cruza as fronteiras
 * horizontais entre as telas. Precisa ter TOTAL_STEPS + 1 valores: cada tela
 * `i` usa WAYPOINTS[i] no topo e WAYPOINTS[i + 1] na base.
 */
const WAYPOINTS_X: number[] = [
  -30, // topo da tela 1 (vem da esquerda)
  220, // base 1 / topo 2
  60, // base 2 / topo 3
  300, // base 3 / topo 4 (desce até em baixo em U)
  140, // base 4 / topo 5
  320, // base 5 / topo 6
  100, // base 6 / topo 7
  280, // base 7 / topo 8
  80, // base 8 / topo 9
  280, // base 9 / topo 10
  195, // base 10 / topo 11
  195, // base da tela 11
];

/**
 * Retorna o `d` de um path SVG para o segmento da linha numa dada tela.
 * Curva de Bézier cúbica suave (formato em "S") ligando o ponto de entrada no
 * topo ao ponto de saída na base, com leve folga para fora do viewBox.
 */
export function getWaveSegment(stepIndex: number): string {
  const { height, width } = WAVE_VIEWBOX;
  const xIn = WAYPOINTS_X[stepIndex] ?? WAYPOINTS_X[0];
  const xOut = WAYPOINTS_X[stepIndex + 1] ?? xIn;

  const yTop = -20;
  const yBottom = height + 20;

  // Custom path para a Tela 1: A linha nasce de um gancho no centro
  if (stepIndex === 0) {
    const startX = width * 0.42;
    const startY = height * 0.65;
    return `M ${startX} ${startY} C ${startX} ${startY + 120}, ${width * 0.8} ${startY + 100}, ${width} ${height * 0.48}`;
  }

  // Custom path para a Tela 2: Entra pela esquerda, faz um arco que desce até a base e sobe alto pela direita
  if (stepIndex === 1) {
    return `M 0 ${height * 0.48} C ${width * 0.15} ${height * 0.85}, ${width * 0.55} ${height * 1.1}, ${width} ${height * 0.15}`;
  }

  // Custom path para a Tela 3 (O que você prefere?): Entra alto na esquerda, desce num U estreito, sobe fazendo uma lombada e sai à direita
  if (stepIndex === 2) {
    return `
      M 0 ${height * 0.15}
      C ${width * 0.1} ${height * 0.4}, ${width * 0.25} ${height * 0.95}, ${width * 0.45} ${height * 0.75}
      S ${width * 0.8} ${height * 0.35}, ${width} ${height * 0.55}
    `;
  }

  // Custom path para a Tela 4 (Card salvar para ler): Entra baixo à esquerda, sobe numa crista e passa por trás do card
  if (stepIndex === 3) {
    return `
      M 0 ${height * 0.55}
      C ${width * 0.1} ${height * 0.2}, ${width * 0.4} ${height * 0.1}, ${width * 0.5} ${height * 0.4}
      S ${width * 0.8} ${height * 0.8}, ${width} ${height * 0.4}
    `;
  }

  // Custom path para a Tela 5 (Áudio): Entra meio esquerda, faz um U profundo que encosta no texto, sobe pra uma crista e sai caindo
  if (stepIndex === 4) {
    return `
      M 0 ${height * 0.4}
      C ${width * 0.15} ${height * 0.45}, ${width * 0.25} ${height * 0.65}, ${width * 0.4} ${height * 0.65}
      S ${width * 0.6} ${height * 0.45}, ${width * 0.7} ${height * 0.45}
      S ${width * 0.9} ${height * 0.7}, ${width} ${height * 0.7}
    `;
  }

  // Custom path para a Tela 6 (Bridge): Entra baixo na esquerda, faz uma barriga mínima e sobe uma ladeira até quase o meio, saindo
  if (stepIndex === 5) {
    return `
      M 0 ${height * 0.7}
      C ${width * 0.05} ${height * 0.8}, ${width * 0.15} ${height * 0.75}, ${width * 0.4} ${height * 0.6}
      S ${width * 0.8} ${height * 0.45}, ${width} ${height * 0.52}
    `;
  }

  // Custom path para a Tela 7 (Livros): Entra da esquerda, sobe fazendo um pico estreito, cai reto por trás do livro e curva na base
  if (stepIndex === 6) {
    return `
      M 0 ${height * 0.52}
      C ${width * 0.15} ${height * 0.5}, ${width * 0.15} ${height * 0.4}, ${width * 0.2} ${height * 0.4}
      C ${width * 0.25} ${height * 0.4}, ${width * 0.25} ${height * 0.78}, ${width * 0.6} ${height * 0.78}
      S ${width * 0.9} ${height * 0.7}, ${width} ${height * 0.68}
    `;
  }

  // Custom path para a Tela 8 (Share): Entra por baixo, sobe fazendo um degrau suave no meio e sai pelo topo direito
  if (stepIndex === 7) {
    return `
      M 0 ${height * 0.68}
      C ${width * 0.2} ${height * 0.68}, ${width * 0.4} ${height * 0.5}, ${width * 0.5} ${height * 0.5}
      S ${width * 0.8} ${height * 0.3}, ${width} ${height * 0.3}
    `;
  }

  // Custom path para a Tela 9 (Recompensas): Entra pelo alto, cai num U alongado por trás do bloco e sai pela direita
  if (stepIndex === 8) {
    return `
      M 0 ${height * 0.3}
      C ${width * 0.2} ${height * 0.3}, ${width * 0.4} ${height * 0.85}, ${width * 0.7} ${height * 0.75}
      S ${width * 0.9} ${height * 0.55}, ${width} ${height * 0.55}
    `;
  }

  // Custom path para a Tela 10 (Profile): Entra da esquerda, sobe cruzando por trás do avatar, faz um laço e sai por baixo
  if (stepIndex === 9) {
    return `
      M 0 ${height * 0.55}
      C ${width * 0.1} ${height * 0.65}, ${width * 0.3} ${height * 0.65}, ${width * 0.45} ${height * 0.42}
      C ${width * 0.6} ${height * 0.2}, ${width * 0.7} ${height * 0.4}, ${width * 0.45} ${height * 0.6}
      C ${width * 0.3} ${height * 0.75}, ${width * 0.7} ${height * 0.7}, ${width} ${height * 0.7}
    `;
  }

  // Custom path para a Tela 11 (Tudo pronto): Entra da esquerda, mergulha, sobe numa crista e cai desenhando uma Seta no centro-baixo
  if (stepIndex === 10) {
    const endX = width * 0.5;
    const endY = height * 0.8;
    return `
      M 0 ${height * 0.7}
      C ${width * 0.05} ${height * 0.75}, ${width * 0.08} ${height * 0.8}, ${width * 0.15} ${height * 0.65}
      S ${width * 0.2} ${height * 0.48}, ${width * 0.25} ${height * 0.48}
      S ${width * 0.45} ${height * 0.7}, ${endX} ${endY}
      L ${endX - 25} ${endY - 15}
      L ${endX} ${endY}
      L ${endX + 15} ${endY - 25}
    `;
  }
  
  // Custom path para a Tela 10 (Loop do Perfil)
  if (stepIndex === 9) {
    const cx = width / 2;
    const cy = height * 0.6; 
    const r = 70;
    
    // Caminho entra, dá a volta por cima do avatar, desce
    return `
      M ${xIn} ${yTop}
      C ${xIn} ${cy - 100}, ${cx + r + 30} ${cy - r - 30}, ${cx + r} ${cy}
      C ${cx + r} ${cy + r}, ${cx - r} ${cy + r}, ${cx - r} ${cy}
      C ${cx - r} ${cy - r}, ${cx} ${cy - r}, ${cx} ${cy - r}
      C ${cx} ${cy - r}, ${xOut} ${cy + 100}, ${xOut} ${yBottom}
    `;
  }

  // Custom path para a Tela 11 (Seta pro botão)
  if (stepIndex === 10) {
    // Linha desce com um S, e termina em uma seta virada pra baixo
    return `
      M ${xIn} ${yTop}
      C ${xIn} ${height * 0.3}, ${xOut + 80} ${height * 0.5}, ${xOut} ${height * 0.85}
      M ${xOut - 15} ${height * 0.85 - 15} L ${xOut} ${height * 0.85} L ${xOut + 15} ${height * 0.85 - 15}
    `;
  }

  // Default: S curve
  const c1y = height * 0.38;
  const c2y = height * 0.62;

  return `M ${xIn} ${yTop} C ${xIn} ${c1y}, ${xOut} ${c2y}, ${xOut} ${yBottom}`;
}

/** X (0..1 normalizado) onde a linha cruza a vertical no meio da tela. */
export function getWaveMidX(stepIndex: number): number {
  const xIn = WAYPOINTS_X[stepIndex] ?? WAYPOINTS_X[0];
  const xOut = WAYPOINTS_X[stepIndex + 1] ?? xIn;
  return (xIn + xOut) / 2 / WAVE_VIEWBOX.width;
}
