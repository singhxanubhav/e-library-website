export type TagType = "industry" | "technique" | "business_model" | "geography" | "stage";

export interface TagItem {
  id: string;
  type: TagType;
  value: string;
}

export interface TractionMetrics {
  arr?: string;
  users?: string;
  queries?: string;
  growth?: string;
  stats?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
}

export interface InteractionOption {
  id: string;
  text: string;
  description?: string;
  percentage?: number;
}

export interface ModuleInteractionData {
  id: string;
  type: "poll" | "challenge" | "tradeoff" | "peer_insight";
  promptText: string;
  options?: InteractionOption[];
  totalVotes?: number;
}

export interface CompanyData {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string | null;
  logoPermission: boolean;
  founders: string;
  foundingYear: number;
  hqCity: string;
  hqCountry: string;
  sector: string;
  valueProposition: string;
  fundingStage: string;
  notableInvestors: string;
  problemDescription: string;
  aiSolutionDescription: string;
  businessModelDescription: string;
  tractionMetrics: TractionMetrics;
  keyInsights: string[];
  funFact?: string | null;
  readingTimeMin: number;
  isFeatured: boolean;
  tags?: {
    industry?: string[];
    technique?: string[];
    business_model?: string[];
    geography?: string[];
    stage?: string[];
  };
  interaction?: ModuleInteractionData;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyFilterParams {
  search?: string;
  industry?: string[];
  technique?: string[];
  geography?: string[];
  businessModel?: string[];
  stage?: string[];
  sort?: "name" | "foundingYear" | "stage" | "readingTime";
  page?: number;
  pageSize?: number;
}
