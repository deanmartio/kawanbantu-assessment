export type AnswerValue = 1 | 2 | 3 | 4;

export type BudgetOption = 'none' | 'low' | 'mid' | 'high';

export type DimensionStatus = 'kritis' | 'berkembang' | 'kuat';

export type OverallTier = 'pemula' | 'berkembang' | 'siap' | 'mahir';

export type ProfileTrack = 'fix' | 'optimize' | 'scale';

export type DimensionId =
  | 'kredibilitas'
  | 'track_record'
  | 'narasi'
  | 'tim'
  | 'digital'
  | 'akses';

export interface Question {
  id: number;
  dimensionId: DimensionId | 'budget';
  text: string;
  options: {
    value: AnswerValue;
    label: string;
  }[];
  isScored: boolean;
}

export interface Dimension {
  id: DimensionId;
  label: string;
  shortLabel: string;
  weight: number;
  questionIds: number[];
  dependencyOrder: number;
}

export interface DimensionResult {
  id: DimensionId;
  label: string;
  shortLabel: string;
  score: number;
  status: DimensionStatus;
  pointsEarned: number;
  maxPoints: number;
}

export interface AssessmentResult {
  overallScore: number;
  overallTier: OverallTier;
  dimensions: DimensionResult[];
  profileTrack: ProfileTrack;
  rootBottleneck: DimensionId | null;
  secondaryBottleneck: DimensionId | null;
  leveragePoint: DimensionId | null;
  budgetTier: BudgetOption;
  criticalDimensions: DimensionId[];
  answers: Record<number, AnswerValue>;
}

export interface ContactInfo {
  name: string;
  ngo: string;
  email: string;
  phone: string;
}

export interface RecommendationCard {
  dimensionId: DimensionId;
  label: string;
  score: number;
  status: DimensionStatus;
  headline: string;
  insight: string;
  action: string;
  prerequisiteNote?: string;
  kbRecommendation: string;
}

export interface SubmitPayload {
  contact: ContactInfo;
  result: AssessmentResult;
  answers: Record<number, AnswerValue>;
  budgetAnswer: string;
  timestamp: string;
}
