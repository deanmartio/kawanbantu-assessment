import { dimensions } from './questions';
import {
  AnswerValue,
  BudgetOption,
  DimensionId,
  DimensionResult,
  DimensionStatus,
  OverallTier,
  ProfileTrack,
  AssessmentResult,
} from '@/types';

// ─── BUDGET MAPPING ─────────────────────────────────────────────────────────

export function getBudgetTier(budgetAnswer: AnswerValue): BudgetOption {
  switch (budgetAnswer) {
    case 1: return 'none';
    case 2: return 'low';
    case 3: return 'mid';
    case 4: return 'high';
    default: return 'none';
  }
}

// ─── DIMENSION SCORING ───────────────────────────────────────────────────────

function scoreDimension(
  dimensionId: DimensionId,
  answers: Record<number, AnswerValue>
): DimensionResult {
  const dim = dimensions.find((d) => d.id === dimensionId)!;
  const questionIds = dim.questionIds;
  const maxPoints = questionIds.length * 4;

  const pointsEarned = questionIds.reduce((sum, qId) => {
    return sum + (answers[qId] ?? 1);
  }, 0);

  const score = Math.round((pointsEarned / maxPoints) * 100);

  let status: DimensionStatus;
  if (score <= 40) status = 'kritis';
  else if (score <= 70) status = 'berkembang';
  else status = 'kuat';

  return {
    id: dimensionId,
    label: dim.label,
    shortLabel: dim.shortLabel,
    score,
    status,
    pointsEarned,
    maxPoints,
  };
}

// ─── OVERALL SCORE ───────────────────────────────────────────────────────────

function calcOverallScore(dimResults: DimensionResult[]): number {
  const score = dimResults.reduce((total, result) => {
    const dim = dimensions.find((d) => d.id === result.id)!;
    return total + result.score * dim.weight;
  }, 0);
  return Math.round(score);
}

function getOverallTier(score: number): OverallTier {
  if (score <= 30) return 'pemula';
  if (score <= 55) return 'berkembang';
  if (score <= 75) return 'siap';
  return 'mahir';
}

// ─── BOTTLENECK DETECTION ────────────────────────────────────────────────────

// Dependency order: kredibilitas → track_record → narasi → tim → digital → akses
const DEPENDENCY_ORDER: DimensionId[] = [
  'kredibilitas',
  'track_record',
  'narasi',
  'tim',
  'digital',
  'akses',
];

function findBottlenecks(dimResults: DimensionResult[]): {
  rootBottleneck: DimensionId | null;
  secondaryBottleneck: DimensionId | null;
  criticalDimensions: DimensionId[];
} {
  // Get all Kritis dimensions sorted by dependency order
  const criticalDimensions = DEPENDENCY_ORDER.filter((id) => {
    const result = dimResults.find((d) => d.id === id);
    return result?.status === 'kritis';
  });

  return {
    rootBottleneck: criticalDimensions[0] ?? null,
    secondaryBottleneck: criticalDimensions[1] ?? null,
    criticalDimensions,
  };
}

// ─── LEVERAGE POINT ──────────────────────────────────────────────────────────

function findLeveragePoint(dimResults: DimensionResult[]): DimensionId | null {
  // Highest scoring Kuat dimension first
  const kuatDims = dimResults
    .filter((d) => d.status === 'kuat')
    .sort((a, b) => b.score - a.score);

  if (kuatDims.length > 0) return kuatDims[0].id;

  // Fallback: highest scoring Berkembang
  const berkembangDims = dimResults
    .filter((d) => d.status === 'berkembang')
    .sort((a, b) => b.score - a.score);

  return berkembangDims[0]?.id ?? null;
}

// ─── PROFILE TRACK ───────────────────────────────────────────────────────────

function getProfileTrack(dimResults: DimensionResult[]): ProfileTrack {
  const hasKritis = dimResults.some((d) => d.status === 'kritis');
  if (hasKritis) return 'fix';

  const hasBerkembang = dimResults.some((d) => d.status === 'berkembang');
  if (hasBerkembang) return 'optimize';

  return 'scale';
}

// ─── MAIN SCORING FUNCTION ───────────────────────────────────────────────────

export function calculateResults(
  answers: Record<number, AnswerValue>,
  budgetAnswer: AnswerValue
): AssessmentResult {
  const dimIds: DimensionId[] = [
    'kredibilitas',
    'track_record',
    'narasi',
    'tim',
    'digital',
    'akses',
  ];

  const dimResults = dimIds.map((id) => scoreDimension(id, answers));

  const overallScore = calcOverallScore(dimResults);
  const overallTier = getOverallTier(overallScore);
  const { rootBottleneck, secondaryBottleneck, criticalDimensions } =
    findBottlenecks(dimResults);
  const leveragePoint = findLeveragePoint(dimResults);
  const profileTrack = getProfileTrack(dimResults);
  const budgetTier = getBudgetTier(budgetAnswer);

  return {
    overallScore,
    overallTier,
    dimensions: dimResults,
    profileTrack,
    rootBottleneck,
    secondaryBottleneck,
    leveragePoint,
    budgetTier,
    criticalDimensions,
    answers,
  };
}

// ─── TIER DISPLAY HELPERS ────────────────────────────────────────────────────

export const tierConfig: Record<
  OverallTier,
  { label: string; color: string; bg: string; description: string }
> = {
  pemula: {
    label: 'Pemula',
    color: '#992C1A',
    bg: 'bg-red-900/30 border-red-700',
    description:
      'Fondasi fundraising kamu masih perlu dibangun. Ada beberapa hal mendasar yang perlu diselesaikan sebelum kampanye bisa berjalan efektif.',
  },
  berkembang: {
    label: 'Berkembang',
    color: '#F59E0B',
    bg: 'bg-yellow-900/30 border-yellow-700',
    description:
      'Kamu sudah punya pengalaman dan beberapa elemen yang berjalan. Tapi ada gap struktural yang menahan kamu dari hasil yang lebih konsisten.',
  },
  siap: {
    label: 'Siap',
    color: '#2A9E99',
    bg: 'bg-teal-900/30 border-teal-700',
    description:
      'Fondasi fundraising kamu sudah cukup solid. Fokus sekarang adalah mengoptimalkan area spesifik untuk hasil yang lebih besar.',
  },
  mahir: {
    label: 'Mahir',
    color: '#8A59B3',
    bg: 'bg-purple-900/30 border-purple-700',
    description:
      'Kamu sudah melewati tahap membangun. Saatnya memperbesar skala dengan infrastruktur dan tools yang tepat.',
  },
};

export const statusConfig: Record<
  DimensionStatus,
  { label: string; color: string; bgClass: string; dotColor: string }
> = {
  kritis: {
    label: 'Perlu Perhatian',
    color: '#992C1A',
    bgClass: 'bg-red-900/20 border-red-800/50',
    dotColor: 'bg-red-500',
  },
  berkembang: {
    label: 'Berkembang',
    color: '#F59E0B',
    bgClass: 'bg-yellow-900/20 border-yellow-800/50',
    dotColor: 'bg-yellow-400',
  },
  kuat: {
    label: 'Kuat',
    color: '#2A9E99',
    bgClass: 'bg-teal-900/20 border-teal-800/50',
    dotColor: 'bg-teal-400',
  },
};

export const dimensionIcons: Record<DimensionId, string> = {
  kredibilitas: '🏛️',
  track_record: '📊',
  narasi: '✍️',
  tim: '👥',
  digital: '💻',
  akses: '📡',
};
