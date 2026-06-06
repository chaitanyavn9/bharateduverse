export type Universe =
  | "Engineering"
  | "Medical"
  | "Professional"
  | "Government"
  | "Defence"
  | "Research"
  | "Design"
  | "Finance"
  | "Agriculture"
  | "Sustainability"
  | "Food"
  | "Emerging"
  | "Education"
  | "Vocational";

export type EntryPoint =
  | "After 10th"
  | "After 12th"
  | "After Graduation"
  | "After PG";

export type Stream = "MPC" | "BiPC" | "CEC" | "HEC" | "MEC" | "Any" | "Vocational";

export type GoalType = "Job" | "Entrepreneur" | "Research" | "Government Service";

export interface IncomeRange {
  entry: string;
  mid: string;
  senior: string;
}

export interface CareerPath {
  id: string;
  name: string;
  shortName: string;
  universe: Universe;
  description: string;
  entryPoints: EntryPoint[];
  streams: Stream[];
  exams: string[];
  keyExams: string[];
  duration: string;
  incomeRange: IncomeRange;
  scores: {
    jobSecurity: number;
    futureScope: number;
    aiResistance: number;
    entrepreneurship: number;
    researchPotential: number;
    workLifeBalance: number;
    globalScope: number;
    nationalImportance: number;
    difficultyLevel: number;
    educationCost: number;
  };
  timeToEarnYears: number;
  topColleges: string[];
  topCompanies: string[];
  govtOpportunities: string[];
  statesWithOpportunity: string[];
  andhraOpportunities: string[];
  roadmap: RoadmapStep[];
  goalPaths: Partial<Record<GoalType, string>>;
  tags: string[];
  upcomingOpportunities: string[];
}

export interface RoadmapStep {
  stage: string;
  duration: string;
  description: string;
  options?: string[];
}

export interface DiscoveryAnswer {
  currentStage: string;
  interests: string[];
  goalType: GoalType;
  sector: "Government" | "Private" | "Both";
  budget: "Low" | "Medium" | "High";
  location: "Local" | "State" | "India" | "Global";
  incomeExpectation: "Low" | "Medium" | "High";
  stability: "High" | "Medium" | "Risk Taker";
  researchInterest: boolean;
  difficultyTolerance: "Low" | "Medium" | "High";
  riskAppetite: "Low" | "Medium" | "High";
  workStyle: "Desk" | "Field" | "Mixed";
}

export interface ScoredPath {
  path: CareerPath;
  score: number;
  matchReasons: string[];
}
